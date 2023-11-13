import { Button, ButtonGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const PostListItem = ({ data, deleteRecord ,isLoggedIn }) => {
  const deleteHandler = (item) => {
    deleteRecord(item.id);
  };
  const navigate = useNavigate();
  const records = data.map((el, idx) => (
    <tr key={el.id}>
      <td>#{++idx}</td>
      <td>
        {" "}
        <Link to={`post/${el.id}`}>{el.title}</Link>
      </td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="success"
            onClick={() => navigate(`post/${el.id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteHandler(el);
            }}
            disabled={!isLoggedIn}
          >
            Delete
            
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  ));
  return <>{records}</>;
};

export default PostListItem;
