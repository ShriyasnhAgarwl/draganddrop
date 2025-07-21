import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs-extra';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for demo (replace with database in production)
let formSchemas = new Map();
let formSubmissions = new Map();

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
await fs.ensureDir(dataDir);

// Load existing schemas from file if they exist
const schemasFile = path.join(dataDir, 'schemas.json');
try {
  if (await fs.pathExists(schemasFile)) {
    const data = await fs.readJson(schemasFile);
    formSchemas = new Map(Object.entries(data));
    console.log(`Loaded ${formSchemas.size} existing schemas`);
  }
} catch (error) {
  console.log('No existing schemas found, starting fresh');
}

// Helper function to save schemas to file
const saveSchemas = async () => {
  try {
    const data = Object.fromEntries(formSchemas);
    await fs.writeJson(schemasFile, data, { spaces: 2 });
  } catch (error) {
    console.error('Error saving schemas:', error);
  }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Save form schema
app.post('/api/save-schema', async (req, res) => {
  try {
    const { name, schema } = req.body;
    
    if (!name || !schema) {
      return res.status(400).json({ error: 'Name and schema are required' });
    }

    const schemaId = uuidv4();
    const formSchema = {
      id: schemaId,
      name,
      schema,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    formSchemas.set(schemaId, formSchema);
    await saveSchemas();

    res.json({ 
      message: 'Schema saved successfully', 
      id: schemaId,
      schema: formSchema 
    });
  } catch (error) {
    console.error('Error saving schema:', error);
    res.status(500).json({ error: 'Failed to save schema' });
  }
});

// Load form schema
app.get('/api/load-schema/:id', (req, res) => {
  try {
    const { id } = req.params;
    const schema = formSchemas.get(id);
    
    if (!schema) {
      return res.status(404).json({ error: 'Schema not found' });
    }

    res.json(schema);
  } catch (error) {
    console.error('Error loading schema:', error);
    res.status(500).json({ error: 'Failed to load schema' });
  }
});

// Get all schemas
app.get('/api/schemas', (req, res) => {
  try {
    const schemas = Array.from(formSchemas.values()).map(schema => ({
      id: schema.id,
      name: schema.name,
      createdAt: schema.createdAt,
      updatedAt: schema.updatedAt
    }));
    
    res.json(schemas);
  } catch (error) {
    console.error('Error fetching schemas:', error);
    res.status(500).json({ error: 'Failed to fetch schemas' });
  }
});

// Submit form data
app.post('/api/submit-form', (req, res) => {
  try {
    const { schemaId, formData } = req.body;
    
    if (!formData) {
      return res.status(400).json({ error: 'Form data is required' });
    }

    const submissionId = uuidv4();
    const submission = {
      id: submissionId,
      schemaId,
      data: formData,
      submittedAt: new Date().toISOString()
    };

    formSubmissions.set(submissionId, submission);

    // Simulate processing delay
    setTimeout(() => {
      res.json({ 
        message: 'Form submitted successfully', 
        submissionId,
        submittedAt: submission.submittedAt
      });
    }, 1000);

  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

// Get form submissions
app.get('/api/submissions/:schemaId?', (req, res) => {
  try {
    const { schemaId } = req.params;
    let submissions = Array.from(formSubmissions.values());
    
    if (schemaId) {
      submissions = submissions.filter(sub => sub.schemaId === schemaId);
    }
    
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});