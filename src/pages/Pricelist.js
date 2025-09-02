import { useState, useEffect } from 'react';
     import axios from 'axios';

     function Pricelist() {
       const [products, setProducts] = useState([]);
       const [loading, setLoading] = useState(true);
       const [error, setError] = useState(null);

       useEffect(() => {
         const fetchProducts = async () => {
           try {
             const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
             setProducts(response.data);
             setLoading(false);
           } catch (err) {
             setError('Failed to load products.');
             setLoading(false);
           }
         };
         fetchProducts();
       }, []);

       const handleInputChange = async (id, field, value) => {
         const updatedProducts = products.map(product =>
           product.id === id ? { ...product, [field]: value } : product
         );
         setProducts(updatedProducts);

         try {
           await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
             ...products.find(p => p.id === id),
             [field]: value,
           });
         } catch (err) {
           setError('Failed to save product.');
         }
       };

       if (loading) return <p>Loading...</p>;
       if (error) return <p>{error}</p>;

       return (
         <div className="pricelist-container">
           <h1>Pricelist</h1>
           <table className="pricelist-table">
             <thead>
               <tr>
                 <th>Product/Service</th>
                 <th>In Price</th>
                 <th>Price</th>
                 <th>Unit</th>
                 <th>VAT %</th>
                 <th>Quantity</th>
               </tr>
             </thead>
             <tbody>
               {products.map(product => (
                 <tr key={product.id}>
                   <td>
                     <input
                       type="text"
                       value={product.name}
                       onChange={e => handleInputChange(product.id, 'name', e.target.value)}
                     />
                   </td>
                   <td className="desktop-only">
                     <input
                       type="number"
                       value={product.in_price || ''}
                       onChange={e => handleInputChange(product.id, 'in_price', e.target.value)}
                     />
                   </td>
                   <td>
                     <input
                       type="number"
                       value={product.price}
                       onChange={e => handleInputChange(product.id, 'price', e.target.value)}
                     />
                   </td>
                   <td className="desktop-only">
                     <input
                       type="text"
                       value={product.unit || ''}
                       onChange={e => handleInputChange(product.id, 'unit', e.target.value)}
                     />
                   </td>
                   <td className="desktop-only">
                     <input
                       type="number"
                       value={product.vat_rate || ''}
                       onChange={e => handleInputChange(product.id, 'vat_rate', e.target.value)}
                     />
                   </td>
                   <td className="tablet-up">
                     <input
                       type="number"
                       value={product.quantity || ''}
                       onChange={e => handleInputChange(product.id, 'quantity', e.target.value)}
                     />
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       );
     }

     export default Pricelist;