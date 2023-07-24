
// similarity_score starts
function similarity_score(index1,index2){
  if (sequence1[index1-1]==sequence2[index2-1]){
      return 3;
  }
  else{
      return -3;
  }
}
// similarity_score ends

// matrix_score starts
function matrix_score(index1,index2,W){
  var result=[];
  var s=similarity_score(index1,index2);
  result.push(H_matrix[index2-1][index1-1]+s);
  result.push(H_matrix[index2-1][index1]-W);
  result.push(H_matrix[index2][index1-1]-W);
  result.push(0);
  
  return Math.max.apply(null,result);
}
// similarity_score ends

// return a matrix composed of a maximum of input matrix and its index 
function max_dim(H_matrix){
  let _max=0;
  let return_matrix=[];
  for(let m=1;m<H_matrix.length;m++){
      for(let n=1;n<H_matrix[0].length;n++)
      {
          if (H_matrix[m][n] >=_max){
              _max=H_matrix[m][n];
              var index3=m;
              var index4=n;
          }
      }
  }
 return_matrix.push(index3);
 return_matrix.push(index4);
 return_matrix.push(_max);
 return return_matrix;
}
//ends

// a string reversed starts
function reverse(s){
  return s.split("").reverse().join("");
}
// a string reversed ends
const blank='-';
// var sequence1="TGGATACGAATTTTGAGGTGCATGCAAGGC";
// var sequence2="TGGAACGAATTACGGTGCATGCATGC";
var sequence1=document.getElementById('sequence1');
var sequence2=document.getElementById('sequence2');

var get_sequence=document.querySelector("#get_sequence");

get_sequence.addEventListener(
  "click",
  function(){
      var sequence1= sequence1.value;
      var sequence2=sequence2.value;
      alert(sequence1+sequence2);
      console.log('sequence1:',sequence1);
      console.log('sequence2:',sequence2);

//building a H_matrix composed of zeros starts
var H_matrix=[];
for(let k=0;k<sequence2.length+1;k++){
    var h_matrix=[];
    for(let l=0;l<sequence1.length+1;l++){
        h_matrix[l]=0;
    }
    H_matrix[k]=h_matrix;
}
//building a H_matrix composed of zeros ends


var W=2;
var sequenceA='';
var sequenceB='';

//building a H_matrix starts
for(let index1=1;index1<sequence2.length+1;index1++){
    for(let index2=1;index2<sequence1.length+1;index2++){
       
        H_matrix[index1][index2]=matrix_score(index2,index1,W); 
    }
}
//building a H_matrix ends

//searching the maximum of the H_matrix starts
var max_index=max_dim(H_matrix);
var trace_H_index_1=max_index[0];
var trace_H_index_2=max_index[1];
var seq1_index=max_index[1]-1;
var seq2_index=max_index[0]-1;
sequenceA=sequence1[seq1_index];
sequenceB=sequence2[seq2_index];
//searching the maximum of the H_matrix ends

console.log(H_matrix);
console.log('seq1_index:',seq1_index)
console.log('seq2_index:',seq2_index)
console.log('trace_H_index_1:',trace_H_index_1)
console.log('trace_H_index_2:',trace_H_index_2)
console.log('trace_matrix:',H_matrix[trace_H_index_1][trace_H_index_2])
console.log('sequenceA:',sequenceA)
console.log('sequenceB:',sequenceB)
console.log('############')


//tracing back starts
while (true){
    if (seq1_index==0 || seq2_index==0){
       
        break;
    }
   
    
    
    var trace=[H_matrix[trace_H_index_1-1][trace_H_index_2],H_matrix[trace_H_index_1-1][trace_H_index_2-1],H_matrix[trace_H_index_1][trace_H_index_2-1]];
    var m=Math.max.apply(null,trace);
    
    if (trace.indexOf(m)==0){
        seq2_index-=1;
        sequenceA+='_';
        sequenceB+=sequence2[seq2_index];
        trace_H_index_1-=1;
        console.log('seq1_index:',seq1_index)
    console.log('seq2_index:',seq2_index)
    console.log('trace_H_index_1:',trace_H_index_1)
    console.log('trace_H_index_2:',trace_H_index_2)
    console.log('trace_matrix:',H_matrix[trace_H_index_1][trace_H_index_2])
    console.log('trace:',trace)
    console.log('sequenceA:',sequenceA)
    console.log('sequenceB:',sequenceB)
    console.log('-----------------')
    }
        
    else if(trace.indexOf(m)==1){
        seq1_index-=1;
        seq2_index-=1;
        sequenceA+=sequence1[seq1_index];
        sequenceB+=sequence2[seq2_index];
        trace_H_index_1-=1;
        trace_H_index_2-=1;
        
       
        
        console.log('seq1_index:',seq1_index)
    console.log('seq2_index:',seq2_index)
    console.log('trace_H_index_1:',trace_H_index_1)
    console.log('trace_H_index_2:',trace_H_index_2)
    console.log('trace_matrix:',H_matrix[trace_H_index_1][trace_H_index_2])
    console.log('trace:',trace)
    console.log('sequenceA:',sequenceA)
    console.log('sequenceB:',sequenceB)
    console.log('-----------------')
        
    }
        
    else{
        seq1_index-=1;
        sequenceA+=sequence1[seq1_index];
        sequenceB+='_';
        trace_H_index_2-=1;
        console.log('seq1_index:',seq1_index)
    console.log('seq2_index:',seq2_index)
    console.log('trace_H_index_1:',trace_H_index_1)
    console.log('trace_H_index_2:',trace_H_index_2)
    console.log('trace_matrix:',H_matrix[trace_H_index_1][trace_H_index_2])
    console.log('trace:',trace)
    console.log('sequenceA:',sequenceA)
    console.log('sequenceB:',sequenceB)
    console.log('-----------------')
    }

   
  
    
    
  

}

//tracing back ends


var aligned_sequenceA=reverse(sequenceA)+sequence1.substring(max_index[1]);
var aligned_sequenceB=reverse(sequenceB)+sequence2.substring(max_index[0]);
var match=[];
console.log("aligned sequenceA:",aligned_sequenceA);
console.log("aligned_sequenceB:",aligned_sequenceB);


//building div tag starts
if (aligned_sequenceA.length>aligned_sequenceB.length)
{
    div_number=Math.ceil(aligned_sequenceA.length/12);
    shorter_length=sequenceB.length;
}
else{
    div_number=Math.ceil(aligned_sequenceB.length/12);
    shorter_length=sequenceA.length;
}


console.log('div_number:',div_number)

for(let i=0;i<div_number;i++){
    let str=document.createElement("div");
    let div_tag=document.querySelector("#alignment-result").appendChild(str);
    div_tag.setAttribute('class','row g-4');
    div_tag.setAttribute('id','alignment-result-'+(i+1))
}
//building div tag ends


//building aligned_sequenceA p_tags starts
for (let i=0;i<div_number;i++){
    for(let j=0+12*i;j<12*(i+1);j++){
    let str=document.createElement("b");
    str.textContent=aligned_sequenceA[j];
    let p_tag=document.querySelector("#alignment-result-"+(i+1)).appendChild(str);
    p_tag.setAttribute('class','col-md-1')
   }
}
//building aligned_sequenceA p_tags ends

//building match array elements starts
for (let i=0;i<div_number;i++){
   
    for(let j=0+12*i;j<12*(i+1);j++){
    if(aligned_sequenceA[j]=="_" || aligned_sequenceB[j]=="_"){
        console.log('sequenceA',j,aligned_sequenceA[j]);
        console.log('sequenceB',j,aligned_sequenceB[j]);
        match.push(' ');
        console.log('match:',match);
        console.log('----------------------');
    }
    else if(aligned_sequenceA[j]==aligned_sequenceB[j]){
        console.log('sequenceA',j,aligned_sequenceA[j]);
        console.log('sequenceB',j,aligned_sequenceB[j]);
        match.push('|');
        console.log('match:',match);
        console.log('----------------------');
    }
    
    else{
        console.log('sequenceA',j,aligned_sequenceA[j]);
        console.log('sequenceB',j,aligned_sequenceB[j]);
        match.push('*');
        console.log('match:',match);
        console.log('----------------------');
    }

}
}
match=match.slice(0,((div_number-1)*12+shorter_length%12))
//building match array elements ends



// //building match symbol array  starts
// for (let i=0;i<aligned_sequenceA;i++){
  
//     if(aligned_sequenceA[i]=="_" || aligned_sequenceB[i]=="_"){
//         console.log('sequenceA',i,aligned_sequenceA[i]);
//         console.log('sequenceB',i,aligned_sequenceB[i]);
//         match.push(' ');
//         console.log('match:',match);
//         console.log('----------------------');
//     }
//     else if(aligned_sequenceA[i]==aligned_sequenceB[i]){
//         console.log('sequenceA',i,aligned_sequenceA[i]);
//         console.log('sequenceB',i,aligned_sequenceB[i]);
//         match.push('|');
//         console.log('match:',match);
//         console.log('----------------------');
//     }
    
//     else{
//         console.log('sequenceA',i,aligned_sequenceA[i]);
//         console.log('sequenceB',i,aligned_sequenceB[i]);
//         match.push('*');
//         console.log('match:',match);
//         console.log('----------------------');
//     }
// }
// //building match symbol array ends



console.log('*match:',match);
// match starts
for (let i=0;i<div_number;i++){
    for(let j=0+12*i;j<12*(i+1);j++){
    let str=document.createElement("b");
    str.textContent=match[j];
    let p_tag=document.querySelector("#alignment-result-"+(i+1)).appendChild(str);
    p_tag.setAttribute('class','col-md-1')
    }
}
// match ends

for (let i=0;i<div_number;i++){
    for(let j=0+12*i;j<12*(i+1);j++){
    let str=document.createElement("b");
    str.textContent=aligned_sequenceB[j];
    let p_tag=document.querySelector("#alignment-result-"+(i+1)).appendChild(str);
    p_tag.setAttribute('class','col-md-1')
    }
}

//building p tag ends
  },
  false   
);