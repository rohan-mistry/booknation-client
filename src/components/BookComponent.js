import axios from 'axios';
import React from 'react'
import { Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import bookService from '../services/BookService'

class BookComponent extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            books:[],
            currentPage:1,
            recordPerPage:7,
            search:'',
        }
    }
    componentDidMount(){        
        this.getBooksByPagination(this.state.currentPage);
    }
    getBooksByPagination(currentPage){
            currentPage=currentPage-1;
        axios.get("http://localhost:8080/booknation?page="+currentPage+"&size="+this.state.recordPerPage)
        .then(response => response.data).then((data) =>{
             this.setState({books:data.content,
                totalPages:data.totalPages,
                totalElements: data.totalElements,
                currentPage: data.number+1
            });
           });
    }
    //Writing All the pagination functions
    //Show Next page
    showNextPage = () =>{
        if(this.state.currentPage < Math.ceil(this.state.totalElements/this.state.recordPerPage)){
            if(!this.state.search){
            this.getBooksByPagination(this.state.currentPage + 1);
            }else{
                this.searchBook(this.state.currentPage + 1)
            }
        }
    };
    //Show Last Page
    showLastPage = () =>{
        if(this.state.currentPage < Math.ceil(this.state.totalElements/this.state.recordPerPage)){
            if(!this.state.search){
            this.getBooksByPagination(Math.ceil(this.state.totalElements/this.state.recordPerPage));
            }
            else{
                this.searchBook(Math.ceil(this.state.totalElements/this.state.recordPerPage));
            }
        }
    };
    //Show First page
    showFirstPage = ()=>{
        let firstPage = 1;
        if(this.state.currentPage > firstPage){
            if(!this.state.search){
            this.getBooksByPagination(firstPage);
            }else{
                this.searchBook(firstPage)
            }
        }
    };
    //Show previous page
    showPrevPage = () =>{
        let prevPage = 1
        if(this.state.currentPage > prevPage){
            if(!this.state.search){
            this.getBooksByPagination(this.state.currentPage - prevPage);
            }else{
                this.searchBook(this.state.currentPage - prevPage);
            }
        }
    };
    //Search Box Method
    searchBox = (e) => {
        this.setState({
            //assigning value to event target
            [e.target.name]:e.target.value,
        });
    };
    //Search Method Logic
    searchBook=(currentPage)=> {
        currentPage=currentPage-1;
        axios.get("http://localhost:8080/booknation/"+this.state.search+"?page="+currentPage+"&size="+this.state.recordPerPage)
        .then(response => response.data).then((data) =>{
             this.setState({books:data.content,
                totalPages:data.totalPages,
                totalElements: data.totalElements,
                currentPage: data.number+1
            });
           });
    };
    //Reset Search Box
    resetBook = (currentPage)=>{
        this.setState({"search":''});
        this.getBooksByPagination(this.state.currentPage);
    };
    render(){
        const {books, currentPage, totalPages,recordPerPage,search} = this.state;
        return(
        <div>
            
            <h1 className="text-center mt-5 ">List of Books</h1>
            <div className="container mt-2">
            <div style={{float: 'center'}} align="center">
                <div class="form-group mb-2">
                            <input type="text" class="form-control" name="search" size="50"  placeholder="Search Here" value={search}  onChange={this.searchBox}/>
                            <button type="button" name="search" class="btn btn-info my-2 text-center mr-2" onClick={this.searchBook}>Search Book</button>
                            <button type="reset" class="btn btn-secondary text-center ml-5" style={{marginLeft:'10px'}} onClick={this.resetBook}>Clear Book</button>
                </div>
            </div>
            <table className="table table-bordered border-info shadow">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Book Name</th>
                    <th>Book Author</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {books.length===0?
                        <tr align="center"><td colSpan="5">No Record Found</td></tr>:
                        books.map(
                            (books,index) =>(
                                <tr key = {books.id}>
                                        <td>{(recordPerPage*(currentPage-1))+index+1}</td>
                                        <td>{books.bookName}</td>
                                        <td>{books.authorName}</td>
                                        <td>{books.price}</td>
                                    
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            <table className="table">
                <div style={{float:'left',fontFamily: 'monospace',color: '#0275d8'}}>
                    Page {currentPage} of {totalPages}
                </div>
                <div style={{float:'right'}}>
                <div class="clearfix"></div>
                <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a type="button" class="page-link"  disabled={currentPage===1?true:false} onClick={this.showPrevPage}>Previous</a></li>
    <li class="page-item"><a type="button" class="page-link"  disabled={currentPage===1?true:false } onClick={this.showFirstPage}>First</a></li>
    <li class="page-item"><a type="button" class="page-link"  disabled={currentPage===totalPages?true:false } onClick={this.showNextPage}>Next</a></li>
    <li class="page-item"><a type="button" class="page-link"  disabled={currentPage===totalPages?true:false} onClick={this.showLastPage}>Last</a></li>
  </ul>
</nav>
                </div>
            </table>
            </div>
        </div>
        )
    }
}
export default BookComponent