    // const onDelete = id => {
    //   this.props.firestore
    //     .collection('users')
    //     .doc(id)
    //     .delete()
    //     .then(() => {
    //       this.props.history.push('/admin');
    //     })
    //     .catch(err => console.error(err));
    // };

    // const onDeleteLecture = id => {
    //   console.log(id);

    //   this.props.firestore
    //     .collection('lectures')
    //     .doc(id)
    //     .delete()
    //     .then(() => {
    //       this.props.history.push('/admin');
    //       console.log('item deleted');

    //     })
    //     .catch(err => console.error(err));
    // };


            // setTimeout(()=> {
        //     const { lectures } = this.props;
        //     for (var key in lectures) {
        //         if (lectures.hasOwnProperty(key)) {
        //           const item = lectures[key];
        //           if (this.props.match.params.id == item.id) {
        //               console.log(item.videoUrl);
                      
        //             this.setState({
        //                 name: item.name,
        //                 videoUrl: item.videoUrl,
        //                 color: item.color,
        //                 information: item.information
        //             })
        //           }
        //         }
        //       }
        // }, 2000)


        // const { name, videoUrl, information, color } = this.state;
        // const updateRef = this.props.firebase
        //   .firestore()
        //   .collection('lectures')
        //   .doc(this.state.id);
    
        // updateRef
        //   .set({
        //     name,
        //     videoUrl,
        //     information,
        //     color
        //   })
        //   .then(docRef => {
        //     this.setState({
        //       name: '',
        //       videoUrl: '',
        //       information: '',
        //       color: ''
        //     });
        //     this.props.history.push('/redigera/' + this.props.match.params.id);
        //   })
        //   .catch((error) => {
        //     console.error("Error adding document: ", error);
        //   });