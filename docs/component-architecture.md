docs/architecture.md — Component Architecture <br>
| Collection | components in it |
| --- | --- |
| Pages | Home.jsx, ClassInfo.jsx, FilterResults.jsx, error.jsx |
| Shared components | Nav.jsx, Footer.jsx, Search bar tag thing.jsx |
| Feature components | classButtons.jsx, classShortDesc.jsx, comment.jsx |

Firestore Data Model
| Collection | info about collection |
| --- | --- | 
| Collection 1 (classes) | **Collection name:** classes <br>**Fields** <br>id: <br>Class_name: <br>Class_desc: <br>Preqs: <br>Teachers: <br>Subject: <br>Difficulty: <br>Workload: <br>reviews: idk if you can nest collections but if you can, you should try |
| Collection 2 (reviews) | **Collection name:** reviews<br>**Fields**<br>Id:<br>Person:<br>Difficulty:<br>Workload:<br>Review: |

Development Responsibilities
| Person | Responsibilities |
| --- | --- |
| Front-end dev | Wire in the components |
| Back-End Dev | Deal w/ authentication |
| UX/UI Designer | Make the components look nice (css them) |
| UX Researcher | Collect info about classes. Help Front/Back-end dev, UX/UI Designer. | 
| Project Manager | Deal with Git pushes/pulls/conflicts. Help Front/Back-end dev, UX/UI Designer. | 

But we'll all help each other because we are all friends. 
