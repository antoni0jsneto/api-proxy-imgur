import multer from "multer";
import FormData from "form-data";
import axios from "axios";

const upload = multer();

export const config = {
  api: {
    bodyParser: false, // importante para usar multer
  },
};

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  // Adiciona headers de CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
    const multerPromisified = () =>
      new Promise((resolve, reject) => {
        upload.single("image")(req, {}, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });

    await multerPromisified();

    const formData = new FormData();
    formData.append("image", req.file.buffer.toString("base64"));

    const response = await axios.post(
      "https://api.imgur.com/3/image",
      formData,
      {
        headers: {
          Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
          ...formData.getHeaders(),
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Erro ao enviar imagem para o Imgur" });
  }
}
