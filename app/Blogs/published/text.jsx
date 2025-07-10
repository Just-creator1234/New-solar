   useEffect(() => {
     const fetchPosts = async () => {
       try {
         const data = await getPosts("PUBLISHED");
         setPosts(data);
       } catch (error) {
         console.error("Error fetching posts:", error);
       } finally {
         setLoading(false);
       }
     };

     fetchPosts();
   }, []);
