import {Link} from "react-router-dom";

export default function NavMenu() {
  return (
    <nav>
        <div className="left_nav">
            <div>---</div>
            <a href="">flavors</a>
            <a href="">products</a>
        </div>
        <h1>
            <Link to="/">Heladinos</Link>
            </h1>
        <div className="right_nav">
            <div>User</div>
            <div>Bag</div>
        </div>
    </nav>
  )
}
