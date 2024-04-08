// Your code here
function createEmployeeRecord(array){
    return {
        "firstName" : array[0],
        "familyName" : array[1],
        "title" : array[2],
        "payPerHour" : array[3],
        "timeInEvents" : [],
        "timeOutEvents" : []
    }
}

function createEmployeeRecords(arrays){
    let newArray = [];
    for (let arr of arrays){
       newArray.push(createEmployeeRecord(arr));
    }
    return newArray;
}

function createTimeInEvent(record, dateStamp){
    let splitDateTime = dateStamp.split(" ");
    let employeeObj = {
        "type": "TimeIn",
        "hour": Number(splitDateTime[1]),
        "date": splitDateTime[0]
    }
    record["timeInEvents"].push(employeeObj);
    return record;
}

function createTimeOutEvent(record, dateStamp){
    let splitDateTime = dateStamp.split(" ");
    let employeeObj = {
        "type": "TimeOut",
        "hour": Number(splitDateTime[1]),
        "date": splitDateTime[0]
    }
    record["timeOutEvents"].push(employeeObj);
    return record;

}

function hoursWorkedOnDate(record, mydate){
    let timeInEvent = record["timeInEvents"].find(function(eve){
        if (eve.date === mydate)
        return eve;
    });
    let timeOutEvent = record["timeOutEvents"].find(function(event){
        if (event.date === mydate)
        return event;
    });

    return (timeOutEvent.hour - timeInEvent.hour) / 100;

}

function wagesEarnedOnDate(record, mydate){
    return hoursWorkedOnDate(record, mydate) * record.payPerHour
}

function allWagesFor(record){
    let workedDates = record["timeInEvents"].map(function(ele){
        return ele.date
    })
    let accumulativeWages = 0;
    workedDates.forEach(function(date){
        accumulativeWages += wagesEarnedOnDate(record, date);
    })
    return accumulativeWages;
}

function calculatePayroll(array){
    let payroll = 0;
    array.forEach(function(re){
        payroll += allWagesFor(re);
    })
    return payroll;
}