import React,{Component} from 'react';
import { Card,CardBody,CardImg,CardTitle,CardText } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {

        const dish = this.props.dish;
        console.log(dish)

        if (dish != null) {

            const comments = dish.comments.map((comment) => {
                return (
                  <div key={comment.id} >
                      <p>{comment.comment} <br />-- {comment.author} , {comment.date}</p>
                  </div>
                );
            });
    
            return (
                <div className="container">
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                      <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                          <CardTitle>{dish.name}</CardTitle>
                          <CardText>{dish.description}</CardText>
                        </CardBody>
                      </Card>
                    </div>
                    <div  className="col-12 col-md-5 m-1">
                      <Card>
                        <CardBody>
                          <CardTitle><h1>Comments</h1></CardTitle>
                          <CardText>{comments}</CardText>
                        </CardBody>
                      </Card>
                    </div>
                </div>
              </div>  
            );
        }
        


        else
        return(
            <div></div>
        );

    }
}

export default DishDetail;