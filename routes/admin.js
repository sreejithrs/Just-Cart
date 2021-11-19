var express = require('express');
var router = express.Router();
var productHelpers=require('../helpers/product-helpers');

/* GET home page. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{

    res.render('admin/view-products', {products, admin:true });
  })
  
});

router.get('/add-products',(req,res)=>{
  res.render('admin/add-products')
})

router.post('/add-products',(req,res)=>{

  productHelpers.addProduct(req.body,(id)=>{
    
    let image=req.files.image
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render('admin/add-products')
      }
      else{
        console.log(err);
      }
    }) 
    
  })
})

module.exports = router;
