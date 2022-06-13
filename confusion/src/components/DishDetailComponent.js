import React from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem,Button,Row,Label,Col, Modal,ModalHeader,ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function handleSubmit(values,dishId,postComment) {
//  console.log("Current state is",JSON.stringify(values));
//  alert("Current state is"+JSON.stringify(values));
  postComment(dishId,values.rating,values.author,values.comment)
  console.log(JSON.stringify(values))

}




function RenderDish ({dish}) {
  return (
    <FadeTransform
    in
    transformProps={{
        exitTransform: 'scale(0.5) translateY(-50%)'
    }}>
        <div className="col-12 col md-5 m-1">
          <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
         </div>
    </FadeTransform>
  );
}

function RenderComments({comments,dishId,postComment}) {
  const [isModalOpen, setModal] = React.useState(false);
  
  const toggleModal = () => setModal(!isModalOpen);
  if(comments!=null) 
  return (
    <div className="col-12 col-md-5 m-1">
      <h4>Comments</h4>
      <ul className="list-unstyled">
      <Stagger in>
      {comments.map((comment)=>{
          return (
            <Fade in>
            <li key={comment.id}>
              <p>{comment.comment}</p>
              <p>-- {comment.author} , {comment.date}</p>
            </li>
            </Fade>
          );
        })}
      </Stagger>

      </ul>
      <Button outline onClick={toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalBody>
        <ModalHeader onClick={toggleModal}>Submit Comment</ModalHeader>
        <LocalForm onSubmit={(values)=>handleSubmit(values,dishId,postComment)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md = {10}>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>   
                                      <option value="4">4</option>                                      
                                      <option value="5">5</option>                                      
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>Your Name</Label>
                                <Col md = {10}>
                                    <Control.text model=".author" id="author" name="author" 
                                    placeholder="Your Name" 
                                    className="form-control"
                                    validators={{
                                        required,minLength:minLength(3),maxLength:maxLength(10)
                                    }}                                    
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required:"Required",
                                            minLength:"Must be greater than 2 characters",
                                            maxLength:"Must be 15 characters or less"
                                        }} 
                                    />                                                                       
                                </Col>
                            </Row>
              <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md = {10}>
                                    <Control.textarea model=".comment" id="comment" name="comment" 
                                    rows="12"
                                    className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10,offset:2}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>      

        </ModalBody>
      </Modal>
    </div>
  );
  else 
  return (
    <div>
    </div>
  )
}



const DishDetail = (props)=>{

  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }

  else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }

  else if (props.dish != null) 
    return (
      <div className="container">
      <div className="row">
          <Breadcrumb>
              <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
              <h3>{props.dish.name}</h3>
              <hr />
          </div>                
      </div>
      <div className="row">
          <div className="col-12 col-md-5 m-1">
              <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
              <RenderComments comments={props.comments} 
              postComment={props.postComment}
              dishId={props.dish.id}
              />
              <div className="col-12 col-md-5 m-1">
              </div>
          </div>
      </div>      
      </div>
      
    );
  else
  return(
      <div></div>
  );

}

/*class DishDetail extends Component {


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
}*/

export default DishDetail;