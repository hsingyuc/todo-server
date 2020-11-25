import * as multer from 'multer';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/uploads/')
	},
	filename: (req, file, cb) => {
		let customFileName = Math.random().toString(36).substring(7),
			parts = file.originalname.split('.'),
			fileExtension = parts[parts.length - 1] // get file extension from original file name
		cb(null, customFileName + '.' + fileExtension)
	}
})
export default multer({ storage: storage });
