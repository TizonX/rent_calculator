import ListGroup from 'react-bootstrap/ListGroup';

function ListOfRenter() {
    return (
        <ListGroup as="ol" numbered>
            <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
            <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
            <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
        </ListGroup>
    );
}

export default ListOfRenter;