import { Button, Card, NavLink } from "react-bootstrap";

/**
 * Component to create the user
 * @param {data} param0 
 * @returns 
 */
const UserCard = ({ data }) => {
    return (
        <Card className="flex-row w-100">
            <Card.Body>
                <h4>{data.name}</h4>
                <p>{data.email}</p>
                {/* Display the user's city and country if both are available */}
                {data.city && data.country && (
                    <p>
                        {data.city} - {data.country}
                    </p>
                )}
                <Button
                    variant="secondary"
                    as={NavLink}
                    to={`/edit/${data.id}`}
                >
                    Edit User
                </Button>
            </Card.Body>
        </Card>
    );
};

export default UserCard;