import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { db } from './server/db.js';
import { 
  analyzeProjectWithGemini, 
  queryIntegrityOSWithGemini, 
  summarizeEvidenceWithGemini,
  RESPONSIBLE_AI_DISCLAIMER
} from './server/gemini.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Active Session User State (defaults to Administrator)
  let activeUserId = 'u-1';

  // --- AUTH ROUTES ---
  app.get('/api/auth/me', (req, res) => {
    const user = db.getUserById(activeUserId) || db.getUsers()[0];
    const users = db.getUsers();
    res.json({ currentUser: user, availableUsers: users });
  });

  app.post('/api/auth/switch-user', (req, res) => {
    const { userId } = req.body;
    const user = db.getUserById(userId);
    if (user) {
      activeUserId = user.id;
      return res.json({ success: true, user });
    }
    res.status(404).json({ error: 'User not found' });
  });

  app.get('/api/users', (req, res) => {
    res.json(db.getUsers());
  });

  app.post('/api/admin/reset-seed', (req, res) => {
    db.resetSeedData();
    res.json({ success: true, message: 'Seed data successfully reset.' });
  });

  // --- DASHBOARD STATS ---
  app.get('/api/dashboard/stats', (req, res) => {
    const stats = db.getDashboardStats();
    res.json(stats);
  });

  // --- PROJECTS API ---
  app.get('/api/projects', (req, res) => {
    const projects = db.getProjects();
    res.json(projects);
  });

  app.get('/api/projects/:id', (req, res) => {
    const project = db.getProjectById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    const breakdown = db.getIntegrityScoreBreakdown(project.id);
    const commitments = db.getCommitments(project.id);
    const evidence = db.getEvidence(project.id);
    const feedback = db.getFeedback(project.id);
    const risks = db.getRisks(project.id);
    const activities = db.getActivities(project.id);

    res.json({
      project,
      integrityBreakdown: breakdown,
      commitments,
      evidence,
      feedback,
      risks,
      activities
    });
  });

  app.post('/api/projects', (req, res) => {
    try {
      const newProject = db.createProject(req.body);
      res.status(201).json(newProject);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.put('/api/projects/:id', (req, res) => {
    const updated = db.updateProject(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Project not found' });
    res.json(updated);
  });

  // --- COMMITMENTS API ---
  app.get('/api/commitments', (req, res) => {
    const projectId = req.query.projectId as string | undefined;
    const commitments = db.getCommitments(projectId);
    res.json(commitments);
  });

  app.post('/api/commitments', (req, res) => {
    try {
      const newCommitment = db.createCommitment(req.body);
      res.status(201).json(newCommitment);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.put('/api/commitments/:id', (req, res) => {
    const updated = db.updateCommitment(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Commitment not found' });
    res.json(updated);
  });

  // --- EVIDENCE VAULT API ---
  app.get('/api/evidence', (req, res) => {
    const projectId = req.query.projectId as string | undefined;
    const evidence = db.getEvidence(projectId);
    res.json(evidence);
  });

  app.post('/api/evidence', (req, res) => {
    try {
      const currentUser = db.getUserById(activeUserId);
      const evidenceData = {
        ...req.body,
        uploaderName: req.body.uploaderName || currentUser?.name || 'Authorized Field User',
        uploaderOrg: req.body.uploaderOrg || currentUser?.organization || 'Tigray Field Operations'
      };
      const newEvidence = db.createEvidence(evidenceData);
      res.status(201).json(newEvidence);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.put('/api/evidence/:id/verify', (req, res) => {
    const { status } = req.body; // 'Verified' | 'Flagged'
    const currentUser = db.getUserById(activeUserId);
    const updated = db.verifyEvidence(
      req.params.id, 
      `${currentUser?.name || 'Auditor'} (${currentUser?.organization || 'Verification Team'})`, 
      status
    );
    if (!updated) return res.status(404).json({ error: 'Evidence item not found' });
    res.json(updated);
  });

  // --- COMMUNITY FEEDBACK API ---
  app.get('/api/feedback', (req, res) => {
    const projectId = req.query.projectId as string | undefined;
    const feedback = db.getFeedback(projectId);
    res.json(feedback);
  });

  app.post('/api/feedback', (req, res) => {
    try {
      const newFeedback = db.createFeedback(req.body);
      res.status(201).json(newFeedback);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.put('/api/feedback/:id/status', (req, res) => {
    const { status, resolutionNotes } = req.body;
    const updated = db.updateFeedbackStatus(req.params.id, status, resolutionNotes);
    if (!updated) return res.status(404).json({ error: 'Feedback report not found' });
    res.json(updated);
  });

  // --- RISKS API ---
  app.get('/api/risks', (req, res) => {
    const projectId = req.query.projectId as string | undefined;
    const risks = db.getRisks(projectId);
    res.json(risks);
  });

  app.post('/api/risks', (req, res) => {
    try {
      const newRisk = db.createRisk(req.body);
      res.status(201).json(newRisk);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.put('/api/risks/:id', (req, res) => {
    const updated = db.updateRisk(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Risk item not found' });
    res.json(updated);
  });

  // --- ACTIVITIES LOG ---
  app.get('/api/activities', (req, res) => {
    const projectId = req.query.projectId as string | undefined;
    const activities = db.getActivities(projectId);
    res.json(activities);
  });

  // --- GEMINI INTEGRITY AI ENDPOINTS ---
  app.post('/api/ai/analyze-project', async (req, res) => {
    try {
      const { projectId } = req.body;
      if (!projectId) {
        return res.status(400).json({ error: 'projectId is required' });
      }
      const analysis = await analyzeProjectWithGemini(projectId);
      res.json(analysis);
    } catch (err: any) {
      console.error('Error analyzing project:', err);
      res.status(500).json({ error: err.message || 'AI Analysis failed' });
    }
  });

  app.post('/api/ai/query', async (req, res) => {
    try {
      const { query, projectId } = req.body;
      if (!query) {
        return res.status(400).json({ error: 'query is required' });
      }
      const result = await queryIntegrityOSWithGemini(query, projectId);
      res.json(result);
    } catch (err: any) {
      console.error('Error in AI Query:', err);
      res.status(500).json({ error: err.message || 'AI Query failed' });
    }
  });

  app.post('/api/ai/summarize-evidence', async (req, res) => {
    try {
      const { text, title } = req.body;
      if (!text || !title) {
        return res.status(400).json({ error: 'text and title are required' });
      }
      const result = await summarizeEvidenceWithGemini(text, title);
      res.json(result);
    } catch (err: any) {
      console.error('Error summarizing evidence:', err);
      res.status(500).json({ error: err.message || 'AI Summarization failed' });
    }
  });

  // --- EXPORTABLE PROJECT REPORTS API ---
  app.get('/api/reports/:projectId', (req, res) => {
    const projectId = req.params.projectId;
    const project = db.getProjectById(projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const breakdown = db.getIntegrityScoreBreakdown(projectId);
    const commitments = db.getCommitments(projectId);
    const evidence = db.getEvidence(projectId);
    const feedback = db.getFeedback(projectId);
    const risks = db.getRisks(projectId);
    const activities = db.getActivities(projectId);

    res.json({
      title: `Integrity-OS Official Traceability Report: ${project.title}`,
      generatedAt: new Date().toISOString(),
      reportCode: `REP-${project.code}-${Date.now().toString().slice(-6)}`,
      project,
      integrityBreakdown: breakdown,
      commitments,
      evidence,
      feedback,
      risks,
      recentActivities: activities.slice(0, 10),
      disclaimer: RESPONSIBLE_AI_DISCLAIMER
    });
  });

  // --- VITE MIDDLEWARE / STATIC SERVING ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Integrity-OS Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
