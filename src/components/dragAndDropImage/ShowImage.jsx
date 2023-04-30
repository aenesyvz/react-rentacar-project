import Image from "./Image";
import "./styles.css"
const ShowImage = ({ images }) => {
	const show = (image) => {
		console.log("SRC: " +JSON.stringify(image));
		return <Image image={image} />;
	};

	return <div className="drag__content">{images.map(show)}</div>;
};

export default ShowImage;