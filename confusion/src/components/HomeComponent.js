import React from "react";
import {Card,CardImg,CardText,CardBody,CardTitle,CardSubtitle} from "reactstrap";

function Home (props) {

    function RenderCard({item}) {
        return (
            <Card>
                <CardImg width="10%" height="40%" src={item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.title}</CardTitle>
                    {item.designation?<CardSubtitle>{item.designation}</CardSubtitle>:null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    return (
        <div className="container">
            <div className="row-align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} />
                </div>
            </div>
        </div>
    )
}

export default Home;