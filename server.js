const express = require('express');
const { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const path = require('path');

const app = express();
const PORT = 3000;
const BUCKET = process.env.S3_BUCKET;
const REGION = process.env.AWS_REGION || 'us-east-1';

const s3 = new S3Client({ region: REGION });

app.use(express.json());

// Servir archivos estáticos (index.html, login.html, auth.js)
app.use(express.static(path.join(__dirname, 'public')));

// ── GET /api/presign — genera URL firmada para subir imagen ───────────────
app.get('/api/presign', async (req, res) => {
  try {
    const { filename, contentType } = req.query;
    if (!filename || !contentType) {
      return res.status(400).json({ error: 'filename y contentType son requeridos' });
    }

    const key = `images/${Date.now()}-${filename}`;
    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: contentType,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 300 }); // 5 min
    res.json({ url, key });
  } catch (err) {
    console.error('Error generando presigned URL:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/images — lista imágenes del bucket ───────────────────────────
app.get('/api/images', async (req, res) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: 'images/',
    });
    const data = await s3.send(command);
    const images = (data.Contents || [])
      .filter(obj => obj.Key !== 'images/')
      .map(obj => ({
        key: obj.Key,
        name: obj.Key.replace('images/', '').replace(/^\d+-/, ''),
        size: obj.Size,
        date: obj.LastModified,
        url: `https://${BUCKET}.s3.${REGION}.amazonaws.com/${obj.Key}`
      }));
    res.json(images);
  } catch (err) {
    console.error('Error listando imágenes:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── DELETE /api/images/:key — elimina imagen del bucket ──────────────────
app.delete('/api/images', async (req, res) => {
  try {
    const { key } = req.body;
    if (!key) return res.status(400).json({ error: 'key es requerido' });

    const command = new DeleteObjectCommand({ Bucket: BUCKET, Key: key });
    await s3.send(command);
    res.json({ deleted: key });
  } catch (err) {
    console.error('Error eliminando imagen:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── Redirigir raíz a index.html ───────────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Cloud Gallery server corriendo en http://localhost:${PORT}`);
  console.log(`📦 Bucket S3: ${BUCKET}`);
});
