import { StarFilled } from '@ant-design/icons';


const Rating = ({ rating, setRating, hover, setHover }) => {
    return (
        <>
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;

                return <label key={index} >
                    <input
                        type="radio"
                        name='rating'
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                    />
                    <StarFilled
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                        className={`text-3xl mr-2 star ${ratingValue <= (hover || rating) ? "star-yellow" : "star-gray"}`}
                    />
                </label>
            })}
        </>
    );
};

export default Rating;