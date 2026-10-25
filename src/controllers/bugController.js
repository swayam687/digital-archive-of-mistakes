const supabase = require('../config/supabaseClient');

// 1. CREATE (POST /bugs)
exports.createBug = async (req, res) => {
  const { error_message, solution, reason, language, topic } = req.body;

  // Basic validation
  if (!error_message) {
    return res.status(400).json({ error: 'error_message is required' });
  }

  const { data, error } = await supabase
    .from('bugs')
    .insert([{ error_message, solution, reason, language, topic }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data[0]); // 201 Created
};

// 2. READ ALL (GET /bugs)
exports.getAllBugs = async (req, res) => {
  const { language, topic } = req.query;

  let query = supabase.from('bugs').select('*');

  // Apply filters if query parameters exist
  if (language) query = query.eq('language', language);
  if (topic) query = query.eq('topic', topic);

  const { data, error } = await query;

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

// 3. READ ONE (GET /bugs/:id)
exports.getBugById = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('bugs')
    .select('*')
    .eq('id', id)
    .single();

  // .single() throws an error if no row is found, so we handle it as a 404
  if (error) return res.status(404).json({ error: 'Bug not found' });

  res.json(data);
};

// 4. UPDATE FULL (PUT /bugs/:id)
exports.updateBug = async (req, res) => {
  const { id } = req.params;
  const { error_message, solution, reason, language, topic } = req.body;

  const { data, error } = await supabase
    .from('bugs')
    .update({ error_message, solution, reason, language, topic })
    .eq('id', id)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  if (data.length === 0) return res.status(404).json({ error: 'Bug not found' });

  res.json(data[0]);
};

// 5. UPDATE PARTIAL (PATCH /bugs/:id)
exports.patchBug = async (req, res) => {
  const { id } = req.params;

  // Supabase will only update the fields provided in req.body
  const { data, error } = await supabase
    .from('bugs')
    .update(req.body)
    .eq('id', id)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  if (data.length === 0) return res.status(404).json({ error: 'Bug not found' });

  res.json(data[0]);
};

// 6. DELETE (DELETE /bugs/:id)
exports.deleteBug = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from('bugs').delete().eq('id', id);

  if (error) return res.status(500).json({ error: error.message });

  res.status(204).send(); // 204 No Content
};

// 7. UNIQUE FEATURE: STATS (GET /bugs/stats/summary)
// Returns how many bugs you've logged per language
exports.getStats = async (req, res) => {
  const { data, error } = await supabase.from('bugs').select('language');

  if (error) return res.status(500).json({ error: error.message });

  // Aggregate counts in JavaScript
  const stats = {};
  data.forEach((row) => {
    if (row.language) {
      stats[row.language] = (stats[row.language] || 0) + 1;
    }
  });

  res.json({
    totalBugs: data.length,
    byLanguage: stats,
  });
};