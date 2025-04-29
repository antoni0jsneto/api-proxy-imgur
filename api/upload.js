// api/upload.js
import multer from "multer";
import nextConnect from "next-connect";
import axios from "axios";
import FormData from "form-data";

const upload = multer();

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Erro: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Método ${req.method} não permitido` });
  },
});

apiRoute.use(upload.single("image"));

apiRoute.post(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao enviar imagem para o Imgur" });
  }
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false, // necessário para o multer
  },
};
