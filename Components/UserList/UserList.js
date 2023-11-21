import ListGroup from "react-bootstrap/ListGroup";

const UserList = ({ renterData = [] }) => {
  return (
    <ListGroup>
      {renterData.map((data, renter_inx) => (
        <ListGroup.Item key={renter_inx}>
          {data.firstName + " " + data.lastName}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default UserList;
