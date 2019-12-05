
### :heart: Star :heart: the repo to support the project or :smile:[Follow Me](https://github.com/harsh6768).Thanks!

# upload-file-s3

Follow steps to upload files on AWS S3 using node.js

1. Create AWS developer account.
   
   Create aws developer account to use all the services provided by the aws.
   
2. Create IAM USER
   
   2.1 Click Add User Button 
   
   <img src="https://github.com/harsh6768/upload-file-s3/blob/master/Images/Screenshot%20from%202019-12-04%2017-34-21.png" alt="">
   
   2.2 Add username and checked programmatic access then click next button
   
   <img src="https://github.com/harsh6768/upload-file-s3/blob/master/Images/Screenshot%20from%202019-12-04%2017-34-52.png" alt="">
   
   2.3 Click Next
   
   <img src="   https://github.com/harsh6768/upload-file-s3/blob/master/Images/Screenshot%20from%202019-12-04%2017-35-02.png" alt="">
   2.4 Click Next
   
    <img src="https://github.com/harsh6768/upload-file-s3/blob/master/Images/Screenshot%20from%202019-12-04%2017-35-13.png" alt="">
   2.5 Click On Create User button
   
   <img src="https://github.com/harsh6768/upload-file-s3/blob/master/Images/Screenshot%20from%202019-12-04%2017-35-22.png" alt="">
   2.6 Write down Access key and Secret Key And Click Close Button
   
   <img src="https://github.com/harsh6768/upload-file-s3/blob/master/Images/Screenshot%20from%202019-12-04%2017-35-37.png" alt="">
   
   2.7  Click  Add Inline Policy Button
   
    <img src="https://github.com/harsh6768/upload-file-s3/blob/master/Images/Screenshot%20from%202019-12-04%2017-35-58.png" alt="">
    
   2.8 Click Json Button And Json Code to Create New Policy and then save it
   
   
            {
             "Version": "2012-10-17",
             "Statement": [
                 {
                     "Effect": "Allow",
                     "Action": [
                         "s3:ListAllMyBuckets",
                         "s3:PutObject",
                         "s3:GetObject"
                     ],
                     "Resource": [
                         "arn:aws:s3:::*"
                     ]
                 }
             ]
           }
           
    2.9 Also Note down the ARN of user
    
3. Create S3 bucket
    
    3.1 Click on Create Bucket and add Bucket Name which should be unique then click Next Button
    
     <img src="https://github.com/harsh6768/upload-file-s3/blob/master/Images/Screenshot%20from%202019-12-04%2017-43-02.png" alt="">
    3.2 Click Next
    
     <img src="https://github.com/harsh6768/upload-file-s3/blob/master/Images/Screenshot%20from%202019-12-04%2017-43-08.png" alt="">
     
    3.3 Click Next
    
     <img src="https://github.com/harsh6768/upload-file-s3/blob/master/Images/Screenshot%20from%202019-12-04%2017-43-13.png" alt="">
    3.4 Click on Create Bucket
    
     <img src="https://github.com/harsh6768/upload-file-s3/blob/master/Images/Screenshot%20from%202019-12-04%2017-43-21.png" alt="">
     
    3.5 After creating bucket click on Permission and then Click Bucket Policy
    
    
     <img src="https://github.com/harsh6768/upload-file-s3/blob/master/Images/Screenshot%20from%202019-12-05%2017-55-38.png" alt="">
     
     3.6  Then add below code and save it
     
           {
          "Version": "2012-10-17",
          "Statement": [
              {
                  "Sid": "AddCannedAcl",
                  "Effect": "Allow",
                  "Principal": {
                      "AWS": "arn:aws:iam::186011777421:user/demos3iamuser"    //Change with Your IAM USER ARN
                  },
                  "Action": [
                      "s3:PutObject",
                      "s3:PutObjectAcl"
                  ], 
                  "Resource": "arn:aws:s3:::demos3bucketuploadfile/*",      //Change with You Bucket ARN before /*
                  "Condition": {
                      "StringEquals": {
                          "s3:x-amz-acl": "public-read"
                      }
                  }
              }
          ]
         }
     
    3.7 Add Cors Configuration and Click Save

             <?xml version="1.0" encoding="UTF-8"?>
         <CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
         <CORSRule>
             <AllowedOrigin>*</AllowedOrigin>
             <AllowedMethod>GET</AllowedMethod>
             <AllowedMethod>POST</AllowedMethod>
             <AllowedMethod>PUT</AllowedMethod>
             <MaxAgeSeconds>3000</MaxAgeSeconds>
             <AllowedHeader>Authorization</AllowedHeader>
         </CORSRule>
         </CORSConfiguration>
    
    
