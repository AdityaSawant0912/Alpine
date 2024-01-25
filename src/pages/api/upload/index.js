import { createRouter } from 'next-connect';
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

let filename = '';
let originalName = '';
const upload = multer({
    storage: multer.diskStorage({
        destination: "./public/inquiry", // destination folder
        filename: (req, file, cb) => cb(null, getFileName(file)),
    }),
});

const getFileName = (file) => {
    let originalName = file.originalname;
    filename = uuidv4() + "-" + new Date().getTime() + "." +
        file.originalname.substring(
            file.originalname.lastIndexOf(".") + 1,
            file.originalname.length
        );
    return filename;
};

const apiRoute = createRouter();

apiRoute.use(upload.array("file")); // attribute name you are sending the file by 

apiRoute.post(async (req, res) => {
    res.status(200).json({ url: `/inquiry/${filename}`, originalName }); // response
});

export default apiRoute.handler();

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
