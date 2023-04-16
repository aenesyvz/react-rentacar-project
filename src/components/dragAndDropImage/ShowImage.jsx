import Image from "./Image";
import "./styles.css"
const ShowImage = ({ images }) => {
	const show = (image) => {
		return <Image image={image} />;
	};

	return <div className="drag__content">{images.map(show)}</div>;
};

export default ShowImage;