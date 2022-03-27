function BinaryTreeCount(root){
    let nodes=0;
    if(root==null)
     return 0;
    else if(root.left==null &&root.right==null)
     return 1;
    else 
     nodes = BinaryTreeCount(root.left)+ BinaryTreeCount(root.right);
    return nodes; 
}

let root = {
    value: 1,
    left: {
        value: 2,
        left: {
                value: 3,
                left: null,
                right: null
            },
            right: {
                value: 4,
                left: null,
                right: null
            }
    },
    right: {
        value: 5,
        left: {
            value: 6,
            left: null,
            right: null
        },
        right: {
            value: 7,
            left: {
                value: 2,
                left: {
                        value: 3,
                        left: null,
                        right: null
                    },
                right: {
                    value: 4,
                    left: null,
                    right: null
                }
            } ,
            right: null  
        }
    }
}
console.log(BinaryTreeCount(root));
   