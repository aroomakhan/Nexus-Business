const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// @route   POST /api/projects
// @desc    Create a new project
router.post('/', async (req, res) => {
  try {
    const { title, description, fundingGoal, category, owner } = req.body;

    const project = await Project.create({
      title,
      description,
      fundingGoal,
      category,
      owner 
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   GET /api/projects
// @desc    Get all projects (Useful for the Investor's "Find Startups" page)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   GET /api/projects/user/:userId
// @desc    Get projects by a specific user (For the Entrepreneur Dashboard)
router.get('/user/:userId', async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.params.userId }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete a project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;

