import React ,{Component} from 'react';
import "./Datainfo.css"
class Datainfo extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeImange = this.handleChangeImange.bind(this);
        this.handleAddImage = this.handleAddImage.bind(this);
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleCancelUpload = this.handleCancelUpload.bind(this);
        this.state = {
           file: null,
           dragOver: false,
           errorNoficication: null,
           rowData: [{},{},{},{},{}],
           isCorrect: true
        };
     }

    // handling image upload event
    handleChangeImange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }

    //   handling change event in input fields
    handleChange(e, row) {
        let isCorrect = false;
        let textError = false;
        let textErrorAlert= false;
        const data = this.state.rowData;
        const {
            value,
            name,
            checked
        } = e.target;
        if (name === 'checkbox') {
            data[row][name] = checked;
        } else if (name === 'select') {
            data[row][name] = value != 'select' ? value : null
        } else {
            data[row][name] = value;
        }
        if (name === 'textarea') {
            if (!value.match(/\d/)) {  // checking whether textarea input not number
                isCorrect = true;

            } else {
                isCorrect = false;
                textError = "Please enter valid text only text"
                textErrorAlert = "1 Error"
                data[row]['textError'] = textError
                data[row]['textErrorAlert'] = textErrorAlert
            }
        }
        data[row]['isCorrect'] = isCorrect

        this.setState({
            rowData: data
        }, () => {

            this.calculatePercentage(row)
        })
    }
    //  calculating percentage of filling all input fields
    calculatePercentage(row) {
        const data = this.state.rowData;
        let percentage = 0;
        for (let [key, value] of Object.entries(data[row])) {
            if (value && key !== 'percentage' && key !== "isCorrect" && key !== "textError"  && key !== "textErrorAlert") {
                percentage = percentage + 20;
            }
        }
        data[row]['percentage'] = percentage;
        this.setState({
            rowData: data
        })
    }
    /**
       Drag and Drop Event Handlers
    **/
    handleDragEnter(e) {
        console.log(e)
        e.preventDefault();
    }
    handleDragOver(e) {
        e.preventDefault();
        if (!this.state.dragOver) {
            this.setState({
                dragOver: true
            });
        }
    }
    handleDragLeave(e) {
        e.preventDefault();
        this.setState({
            dragOver: false
        });
    }
    handleDrop(e, row) {
        console.log(e)
        e.preventDefault();
        let file = e.dataTransfer.files[0];

        // Validate file is of type Image
        let fileType = file.type.split("/")[0];
        if (fileType !== "image") {
            console.log("Not an image file");
            this.setState({
                file: null,
                errorNotification: "Not an image File",
                dragOver: false
            });
            return setTimeout(() => {
                this.setState({
                    errorNotification: null
                });
            }, 3000);
        }
        // this.refs.image.files = e.dataTransfer.files;
        document.getElementById('upload-image-input').fileList = e.dataTransfer.files[0];
        this.readURL(file, row);
        this.setState({
            file,
            dragOver: false
        });
    }


    /**
       Handle Manually (File Input) Added Files
    **/
    handleAddImage(e, row) {
        e.preventDefault();
        let file = e.target.files[0];

        // Validate file is of type Image
        let fileType = file.type.split('/')[0];
        if (fileType !== "image") {
            console.log("Not an image file");
            this.setState({
                file: null,
                errorNotification: "Not an image File",
                dragOverClass: ""
            });
            return setTimeout(() => {
                this.setState({
                    errorNotification: null
                });
            }, 3000);
        }
        this.readURL(file, row);


        this.setState({
            file
        });
    }

    readURL(file, row) {
        let data = this.state.rowData;
        if (file) {
            var reader = new FileReader();

            reader.onload = (e) => {
                data[row]['imageUrl'] = e.target.result;
                this.setState({
                    rowData: data
                }, () => {
                    this.calculatePercentage(row);
                })
            }

            reader.readAsDataURL(file); // convert to base64 string
        }
    }

    /**
       Handle Upload after Upload Button Clicked
    **/
    handleUploadImage(e) {
        e.preventDefault();
        if (this.refs.image.files[0]) {
            console.log("Uploading Image " + this.refs.image.files[0].name + "");
            /**
               Handle image Upload
            **/
        }
    }
    handleCancelUpload(e) {
        e.preventDefault();
        this.setState({
            file: null
        });
    }


    render(){

        let dragOverClass = this.state.dragOver
         ? `display-box drag-over`
         : `display-box`;

      // If file is set, change upload box text to file name
      let uploadText = this.state.file
         ? <div>
              <h4>{this.state.file.name}</h4>
              <button
                 className="cancel-upload-button btn btn-warning"
                 onClick={this.handleCancelUpload}
              >
                 Cancel
             </button>
              <button
                 className="upload-button btn btn-primary"
                 onClick={this.handleUploadImage}
              >
                 Upload
              </button>
           </div>
         : <div>
              <h4>Choose Files to Upload</h4>
           </div>;

      // Show Error message if file type is not an image
      let errorNotification = this.state.errorNotification
         ? <div className="error-notification">
              <p>{this.state.errorNotification}</p>
           </div>
         : null;

        return (
            <div id="table-scroll" className="table-scroll" >
            <div className="table-wrap">
            <table className="main-table">
            <thead>
                <tr>
                <th className="fixed-side" scope="col">Readiness</th>
                <th scope="col">Model #</th>
                {/* <th scope="col">Brand</th> */}
                <th scope="col">Front Facing Image</th>
                <th scope="col">loren Ipsum</th>
                <th scope="col">Lowest Level GTIN</th>
                <th scope="col">Spacial Order Lead Time</th>
                </tr>
            </thead>
            <tbody>
                {
                    [0,1,2,3,4].map(row => (
                <tr key={row}>
                <th className="fixed-side"><div>{this.state.rowData[row].percentage || 0} % </div> <div> {this.state.rowData[row].isCorrect ?'': this.state.rowData[row].textErrorAlert }</div></th>
                <td><input type="text" name="textname" onChange={(event) => this.handleChange(event, row)} value={this.state.value ? "" : this.state.value }/> </td>
                <td><input
                     type="file" name="imagefile" onChange={this.handleChangeImange}
                     id="upload-image-input"
                     className="upload-image-input"
                    //  accept="image/*"
                     onDrop={(event) => this.handleDrop(event, row)}
                     onDragEnter={this.handleDragEnter}
                     onDragOver={this.handleDragOver}
                     onDragLeave={this.handleDragLeave}
                     onChange={(event) => this.handleAddImage(event, row)}
                  />{
                    this.state.rowData[row].imageUrl &&
                    <img id="blah" width="50" height="50" src={this.state.rowData[row].imageUrl} alt="your image" />
                  }
                  </td>
                <td><textarea defaultValue="test" name="textarea" onChange={(event) => this.handleChange(event, row)}  />  {this.state.rowData[row].isCorrect ?'': this.state.rowData[row].textError }  </td>
                <td><select name="select" onChange={(event) => this.handleChange(event, row)} >
                    <option value="select">Select</option>
                    <option value="grapefruit">Grapefruit</option>
                    <option value="lime">Lime</option>
                    <option  value="coconut">Coconut</option>
                    <option value="mango">Mango</option>
                    </select></td>
                <td><input type="checkbox"  name="checkbox" onChange={(event) => this.handleChange(event, row)}/></td>

                </tr>
                    ))
                }

            </tbody>
            </table>
         </div>
        </div>

        )}
};

export default Datainfo;