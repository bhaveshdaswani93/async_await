let students = [{
    id:1,
    name:'suresh',
    schoolId:101
},{
    id:2,
    name:'gopal',
    schoolId:999
}];

let grades = [{
    id:1,
    schoolId:101,
    marks:81
},{
    id:2,
    schoolId:999,
    marks:92
},{
    id:1,
    schoolId:101,
    marks:87
}]

let getStudent = (id)=>{
    return new Promise((resolve,reject)=>{
      let foundStudent = students.find((student)=>{
            return student.id === id
        });
        if(foundStudent){
            resolve(foundStudent)
        }else {
            reject(`student not found with the id ${id}`)
        }
    })
}
let getMarks = (schoolId)=>{
    return new Promise((resolve,reject)=>{
        let marks = grades.filter(grade=>{
            return grade.schoolId === schoolId
        })
        if(marks) {
            resolve(marks)
        }else{
            reject(`could not find marks for shoolid ${schoolId}`)
        }
    })
    
}
let getAvg = (id)=>{
    let user;
    return getStudent(id).then(userTemp=>{
        user = userTemp;
       return getMarks(user.schoolId);
    }).then(marks=>{
      let average =  marks.map(mark=>mark.marks).reduce((a,b)=>a+b)/marks.length
      return `${user.name} has average ${average}%`

    })
}
let getAvgAlt = async (id) => {
    let user = await getStudent(id);
    let marks = await getMarks(user.schoolId);
    let average = 0;
    if(marks.length > 0) {
        average = marks.map(mark=>mark.marks).reduce((a,b)=>a+b)/marks.length;
    }
     
      return `${user.name} has average ${average}%`
}
// getStudent(26).then(student=>{
//     console.log(student)
// }).catch(e=>{
//     console.log(e)
// })
// getMarks(10).then(marks=>{
//     console.log(marks)
// }).catch(e=>{
//     console.log(e)
// })

getAvgAlt(1).then(avg=>{
    console.log(avg)
}).catch(e=>{
    console.log(e)
})