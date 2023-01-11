import "./category-item.styles.scss"
import { useNavigate } from "react-router-dom";


const CategoryItem = ({category}) => {
    const {id, imageUrl, title, route} = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route)

    return  <div key={id} className="category-container">
    <div style={{backgroundImage: `url(${imageUrl})`}} className={"background-image"}></div>
    <div className="category-body-container" onClick={onNavigateHandler}>
      <h2>{title}</h2>
      <p>shop now</p>
    </div>  
   </div>

}

export default CategoryItem