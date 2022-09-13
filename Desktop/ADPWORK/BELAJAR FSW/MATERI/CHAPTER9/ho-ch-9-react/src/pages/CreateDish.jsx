import React, {useState} from 'react'
import { Row,Col,Form, Button} from 'react-bootstrap'
import firebaseConfig from '../config/firebaseConfig'
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'


const CreateDish = () => {
    const navigate = useNavigate()
    const[ dish,setDish] = useState({
        name:'',
        price:0,
        calories:0,
        description:'',
        imageURL:'',
        inStock: true
    })

    const [Loading, setLoading] = useState(false)
    const createDoc = async() => {
        console.log('pushind data to firestore...')
        
        const db = getFirestore(firebaseConfig)
        const coworkingRef = collection(db, 'menus')

        try{
            setLoading(true)
             await setDoc(doc(coworkingRef), {...dish})
        } catch (error) {
            console.log(error.message)
        }
        setLoading(false)
        navigate('/dashboard', {replace:true})
    }

  return (
    <Row className='mt-4 justify-content-center'>
        
        <Col md={7} sm={12}>
        <h1> New Dish</h1>
        <Form className='mt-3'>
            <Row className='g-3'>
                <Col md={6}>
                <Form.Label>Dish Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={dish.name} 
                        onChange={(e) => setDish({...dish, name:e.target.value})}
                    />
                </Col>    
                <Col md={3}>
                <Form.Label>Price</Form.Label>
                    <Form.Control type="number"  value={dish.price} 
                    onChange={(e) => setDish({...dish, price:e.target.value})} />
                </Col>    
                <Col md={3}>
                <Form.Label>Calories</Form.Label>
                    <Form.Control type="number"  value={dish.calories} onChange={(e) => setDish({...dish, calories:e.target.value})} />
                </Col>  
                <Col md={12}>
                <Form.Label>Image Url</Form.Label>
                    <Form.Control type="text" placeholder="Enter image url" value={dish.imageURL} onChange={(e) => setDish({...dish, imageURL:e.target.value})} />
                </Col>  
                <Col md={12}>
                <Form.Label>Description</Form.Label>
                    <Form.Control 
                    as="textarea"
                    placeholder="Leave a desc"
                    style={{ height: '100px'}}
                    value={dish.description}

                    onChange={(e) => setDish({...dish, description:e.target.value})}
                    />
                </Col>  
                <Col md={12}>
                    <Form.Check
                            type='checkbox'
                            value={dish.inStock}
                            label={`Save as draf`}
                            onChange={(e) => setDish({...dish, inStock:!e.target.checked})}
                    />
                </Col>  
                <Col>
                    <Button disabled={Loading} onClick={() => createDoc()}variant='primary'>{Loading ? 'Loading...': 'Create'}</Button>
                </Col>
            </Row>
        </Form>    
        </Col>
    </Row>
  )
}

export default CreateDish
