
  
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Modal, Form, Input, Button, Switch } from 'antd';
import { Product } from '../types/Product';

interface ProductModalProps {
    data: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: Product) => Promise<any>;
}

const ProductModal: React.FC<ProductModalProps> = ({ data, isOpen, onClose, onSubmit }) => {
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [priceError, setPriceError] = useState<string | null>(null);
    const [ratingError, setRatingError] = useState<string | null>(null);
    const [loading,setLoading]=useState(false);
  
    useEffect(() => {
      if (data) {
        console.log(data)
        form.setFieldsValue(data);
        setIsEditing(true);
      } else {
        form.resetFields();
        setIsEditing(false);
      }
    }, [data, form]);
  
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      if (isNaN(value) || value < 0) {
        setPriceError('Price must be a positive number');
      } else {
        setPriceError(null);
      }
    };
  
    const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      if (isNaN(value) || value < 0 || value > 5) {
        setRatingError('Rating must be a number between 0 and 5');
      } else {
        setRatingError(null);
      }
    };
  
    const handleSubmit = async () => {
      setLoading(true)
      try {
        let values = await form.validateFields();
        values=data?.image?{...values,productId:data?.productId,inStock: values.inStock || false}:{...values,inStock: values.inStock || false,productId:data?.productId,image:imageFile}
        if (priceError || ratingError) return; 
        const res=await onSubmit(values as Product);
        if(res.status===200){
          onClose();
      form.resetFields();

        }
    } catch (error) {
        console.error('Validation failed:', error);
      }finally{
        setLoading(false)
      }
    };
  
    const [imageFile, setImageFile] = useState<File | null>(null);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files[0]) {
          setImageFile(files[0]);
      }
  };
    return (
      <Modal centered={true}
        title={isEditing ? 'Edit Product' : 'Add Product'}
        visible={isOpen}
        onCancel={onClose}
        footer={[
          <Button key="cancel" onClick={onClose}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            {isEditing ? `${loading?'Updating...':"Update"}` : `${loading?'Creating...':"Create"}`}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
        <span className='flex w-full gap-4 justify-between'>

          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="brand"
            label="Brand"
            rules={[{ required: true, message: 'Please enter a brand' }]}
          >
            <Input />
          </Form.Item>
          </span>
        <span className='flex w-full gap-4 justify-between'>
         
          <Form.Item
            name="price"
            label="Price"
            validateStatus={priceError ? 'error' : ''}
            help={priceError}
          >
            <Input type="number" onChange={handlePriceChange} />
          </Form.Item>
          <Form.Item name="inStock" label="In Stock" valuePropName="checked">
            <Switch />
          </Form.Item>
          </span>

          <Form.Item
            name="image"
            label="Image"
            rules={[{ required: true, message: 'Please enter an image URL' }]}
          >
            {typeof data?.image==='string'?<Input disabled title='you cant edit this field'/>:<Input type='file' onChange={handleImageChange} accept="image/*"/>}
          </Form.Item>
          <Form.Item
            name="keyFeature"
            label="Key Feature"
            rules={[{ required: true, message: 'Please enter key features' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="productCategory"
            label="Product Category"
            rules={[{ required: true, message: 'Please enter a product category' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="rating"
            label="Rating"
            validateStatus={ratingError ? 'error' : ''}
            help={ratingError}
          >
            <Input type="number" onChange={handleRatingChange} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  
  export default ProductModal;
  