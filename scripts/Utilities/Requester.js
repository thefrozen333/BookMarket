function _makeRequest(method, url, headers, data){
    return $.ajax({
        method: method,
        url: url,
        headers: headers,
        data: JSON.stringify(data)
    });
}

class Requester{
    constructor(){

    }

    get(){
        _makeRequest("GET", url, headers);
    }

    post(){
        _makeRequest("POST", url, headers, data);
    }

    put(){
        //TODO
    }

    delete(){
        //TODO
    }
}