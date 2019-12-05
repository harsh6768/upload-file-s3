
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
