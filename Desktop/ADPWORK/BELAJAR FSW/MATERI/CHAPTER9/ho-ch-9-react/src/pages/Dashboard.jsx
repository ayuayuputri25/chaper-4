import React from 'react'
import firebaseConfig from '../config/firebaseConfig'
import {getFirestore, collection} from 'firebase/firestore'
import {useCollection} from 'react-firebase-hooks/firestore'
import {Row, Col, Table,Badge, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Dashboard = () => {

  const [value, ] = useCollection(
    collection(getFirestore(firebaseConfig), 'menus'),
    {
      snapshotListenOptions: { includeMetadataChanges: true},
    }
  );

  return (
    <div>
      <Row className='mt-4'>
        <Col className='d-flex align-items-center justify-content-between'>
        <h1>Dish List</h1>
        <Button as={Link} to="/createdish" variant="primary">New dish</Button></Col>
      </Row>
      <Row className='mt-3'>
       <Col>
       <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Dish Name</th>
            <th>Price</th>
            <th>Calories</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
        {value && value.docs.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.data().name}</td>
              <td>{doc.data().price}</td>
              <td>{doc.data().calories}</td>
              <td><Badge bg={(doc.data().inStock) ? 'primary': 'secondary'}>{(doc.data().inStock) ? 'In Stock': 'Not Available'}</Badge></td>
            </tr>
         ))}

        </tbody>

       </Table>
       
       </Col>
        

      </Row>
  
    </div>
  )
}

export default Dashboard