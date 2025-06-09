import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor() { }
  private quizData = {
    'WD101': {
        courseName: '',
        questions: [
          {
            question: "What does HTML stand for?",
            options: [
              "Hyper Trainer Marking Language",
              "Hyper Text Marketing Language",
              "Hyper Text Markup Language",
              "Hyperlink and Text Markup Language"
            ],
            correctAnswer: 2
          },
          {
            question: "Which tag is used to create a hyperlink in HTML?",
            options: [
              "<link>",
              "<a>",
              "<href>",
              "<hyperlink>"
            ],
            correctAnswer: 1
          },
          {
            question: "Which CSS property controls the text size?",
            options: [
              "font-style",
              "text-size",
              "font-size",
              "text-style"
            ],
            correctAnswer: 2
          },
          {
            question: "Which HTML element is used for inserting an image?",
            options: [
              "<img>",
              "<picture>",
              "<src>",
              "<image>"
            ],
            correctAnswer: 0
          },
          {
            question: "How do you write a comment in CSS?",
            options: [
              "// this is a comment",
              "# this is a comment",
              "/* this is a comment */",
              "<!-- this is a comment -->"
            ],
            correctAnswer: 2
          },
          {
            question: "What is the correct syntax to refer to an external script called `script.js`?",
            options: [
              "<script href='script.js'>",
              "<script src='script.js'>",
              "<js src='script.js'>",
              "<script link='script.js'>"
            ],
            correctAnswer: 1
          },
          {
            question: "Which event occurs when the user clicks on an HTML element?",
            options: [
              "onchange",
              "onmouseclick",
              "onmouseover",
              "onclick"
            ],
            correctAnswer: 3
          },
          {
            question: "How do you declare a JavaScript variable?",
            options: [
              "variable name = value;",
              "v name = value;",
              "var name = value;",
              "let = value;"
            ],
            correctAnswer: 2
          },
          {
            question: "Which symbol is used for single-line comments in JavaScript?",
            options: [
              "//",
              "/*",
              "<!--",
              "#"
            ],
            correctAnswer: 0
          },
          {
            question: "Which method can be used to output data in JavaScript?",
            options: [
              "console.log()",
              "display()",
              "write()",
              "output()"
            ],
            correctAnswer: 0
          }
        ]
    },
    'WD102': {
      courseName: 'Learn Dot Net Development',
      questions: [
        {
          question: "What is .NET?",
          options: [
            "A type of operating system",
            "A Microsoft framework for building applications",
            "A database management tool",
            "An image editing software"
          ],
          correctAnswer: 1
        },
        {
          question: "Which programming language is most commonly used with .NET?",
          options: [
            "Java",
            "Python",
            "C#",
            "PHP"
          ],
          correctAnswer: 2
        },
        {
          question: "Which of the following is the entry point of a C# console application?",
          options: [
            "Main() method",
            "Run() method",
            "Start() method",
            "Execute() method"
          ],
          correctAnswer: 0
        },
        {
          question: "What does ASP.NET primarily help you develop?",
          options: [
            "Mobile applications",
            "Web applications",
            "Desktop games",
            "Firmware for devices"
          ],
          correctAnswer: 1
        },
        {
          question: "Which of the following is a component of the .NET Framework?",
          options: [
            ".NET Engine",
            "Common Language Runtime (CLR)",
            "ASP Core Service",
            "Windows Engine"
          ],
          correctAnswer: 1
        },
        {
          question: "Which data type is used to store true/false values in C#?",
          options: [
            "bit",
            "boolean",
            "bool",
            "byte"
          ],
          correctAnswer: 2
        },
        {
          question: "What is the file extension for a C# source code file?",
          options: [
            ".cs",
            ".c#",
            ".dotnet",
            ".net"
          ],
          correctAnswer: 0
        },
        {
          question: "What is the purpose of the `using` statement in C#?",
          options: [
            "To declare variables",
            "To import namespaces",
            "To loop over arrays",
            "To define classes"
          ],
          correctAnswer: 1
        },
        {
          question: "Which of the following is used to manage .NET packages?",
          options: [
            "Node.js",
            "NuGet",
            "Composer",
            "PIP"
          ],
          correctAnswer: 1
        },
        {
          question: "Which version of .NET introduced cross-platform support?",
          options: [
            ".NET Framework 3.5",
            ".NET Core",
            ".NET 4.7",
            ".NET Extended"
          ],
          correctAnswer: 1
        }
      ]
    },
    'WD103': {
        courseName: 'Full Stack Web Development (MERN)',
        questions: [
          {
            question: "What is React?",
            options: [
              "A database",
              "A JavaScript library for building user interfaces",
              "A CSS framework",
              "A backend framework"
            ],
            correctAnswer: 1
          },
          {
            question: "What does MongoDB store data as?",
            options: [
              "SQL Tables",
              "JSON-like Documents",
              "CSV Files",
              "Arrays"
            ],
            correctAnswer: 1
          },
          {
            question: "Which command starts a Node.js app?",
            options: [
              "node start",
              "npm run server",
              "node app.js",
              "npm node"
            ],
            correctAnswer: 2
          },
          {
            question: "What does Express.js do?",
            options: [
              "Build UI components",
              "Define routing and middleware",
              "Style HTML elements",
              "Connect to MongoDB"
            ],
            correctAnswer: 1
          },
          {
            question: "What is the default port for MongoDB?",
            options: [
              "27017",
              "3306",
              "5432",
              "8080"
            ],
            correctAnswer: 0
          },
          {
            question: "What JSX stands for in React?",
            options: [
              "JavaScript XML",
              "Java Syntax Extension",
              "JSON Syntax Extension",
              "Java Static Expression"
            ],
            correctAnswer: 0
          },
          {
            question: "Which hook is used for managing state in React?",
            options: [
              "useStatus",
              "useEffect",
              "useReducer",
              "useState"
            ],
            correctAnswer: 3
          },
          {
            question: "Which database is commonly used with MERN stack?",
            options: [
              "MySQL",
              "PostgreSQL",
              "SQLite",
              "MongoDB"
            ],
            correctAnswer: 3
          },
          {
            question: "How do you pass data from parent to child in React?",
            options: [
              "Via props",
              "Via hooks",
              "Via state",
              "Via emit"
            ],
            correctAnswer: 0
          },
          {
            question: "What is `npm` used for?",
            options: [
              "Running Python scripts",
              "Package management for Node.js",
              "Debugging CSS",
              "Compiling Java code"
            ],
            correctAnswer: 1
          }
        ]
    },
    'WD104': {
    courseName: 'Django Full Course',
    questions: [
      {
        question: "What does Django stand for?",
        options: [
          "Dynamic Java Application Network Gateway Object",
          "It's named after Django Reinhardt, a jazz guitarist",
          "Database JSON Application Network Gateway Object", 
          "Dynamic JavaScript Application Network Gateway Object"
        ],
        correctAnswer: 1
      },
      {
        question: "What command is used to create a new Django project?",
        options: [
          "django-admin createproject myproject",
          "django-admin startproject myproject",
          "python manage.py startproject myproject", 
          "python django.py newproject myproject"
        ],
        correctAnswer: 2
      },
      {
        question: "Which file contains Django project settings?",
        options: [
          "manage.py",
          "urls.py",
          "views.py",
          "settings.py"
        ],
        correctAnswer: 3
      },
      {
        question: "What is the role of `urls.py` in Django?",
        options: [
          "Store app configurations",
          "Map URLs to views",
          "Render templates",
          "Handle database models"
        ],
        correctAnswer: 1
      },
      {
        question: "Which command creates a new Django app?",
        options: [
          "python manage.py createapp myapp",
          "django-admin startapp myapp",
          "python manage.py startapp myapp",
          "django-admin createapp myapp"
        ],
        correctAnswer: 2
      },
      {
        question: "What is a Django model used for?",
        options: [
          "Rendering HTML",
          "Routing URLs",
          "Database schema definition",
          "Styling with CSS"
        ],
        correctAnswer: 2
      },
      {
        question: "Which of these is the Django templating language syntax?",
        options: [
          "<% %>",
          "{{ }}",
          "<< >>",
          "[[ ]]"
        ],
        correctAnswer: 1
      },
      {
        question: "What database does Django use by default?",
        options: [
          "PostgreSQL",
          "MySQL",
          "SQLite",
          "Oracle"
        ],
        correctAnswer: 2
      },
      {
        question: "Which function is used to define URLs in `urls.py`?",
        options: [
          "path()",
          "urlmap()",
          "router()",
          "mapurl()"
        ],
        correctAnswer: 0
      },
      {
        question: "What is the command to apply database migrations in Django?",
        options: [
          "python manage.py migrate",
          "python manage.py runserver",
          "python manage.py makemigrations",
          "python manage.py syncdb"
        ],
        correctAnswer: 0
      }
      ]
    },
    'DOPS101': {
      courseName: 'DevOps Full Course',
      questions: [
        {
          question: "What does DevOps stand for?",
          options: [
            "Development and Operations",
            "Device Optimization Services",
            "Design of Production Systems",
            "Development over Production Systems"
          ],
          correctAnswer: 0
        },
        {
          question: "Which of the following is a popular CI/CD tool?",
          options: [
            "Jenkins",
            "MySQL",
            "React",
            "Docker"
          ],
          correctAnswer: 0
        },
        {
          question: "What is the main goal of DevOps?",
          options: [
            "To separate development and operations teams",
            "To slow down software delivery",
            "To improve collaboration and automate deployment",
            "To focus only on infrastructure"
          ],
          correctAnswer: 2
        },
        {
          question: "Which tool is widely used for containerization?",
          options: [
            "GitHub",
            "Ansible",
            "Docker",
            "Nagios"
          ],
          correctAnswer: 2
        },
        {
          question: "What does CI/CD stand for?",
          options: [
            "Central Integration / Code Deployment",
            "Continuous Integration / Continuous Deployment",
            "Code Integration / Code Delivery",
            "Continuous Improvement / Constant Deployment"
          ],
          correctAnswer: 1
        },
        {
          question: "Which configuration management tool is written in Python?",
          options: [
            "Chef",
            "Ansible",
            "Puppet",
            "Kubernetes"
          ],
          correctAnswer: 1
        },
        {
          question: "Which of the following is a version control system?",
          options: [
            "Git",
            "Docker",
            "Jenkins",
            "Terraform"
          ],
          correctAnswer: 0
        },
        {
          question: "What does 'Infrastructure as Code' (IaC) mean?",
          options: [
            "Coding in assembly language",
            "Using hardware for deployment",
            "Managing infrastructure using code",
            "Designing UI using HTML/CSS"
          ],
          correctAnswer: 2
        },
        {
          question: "Which cloud service model is most associated with DevOps?",
          options: [
            "SaaS",
            "PaaS",
            "IaaS",
            "NaaS"
          ],
          correctAnswer: 1
        },
        {
          question: "Which monitoring tool is used in DevOps to track system health?",
          options: [
            "Prometheus",
            "Webpack",
            "Bootstrap",
            "Node.js"
          ],
          correctAnswer: 0
        }
      ]
    },
    'AI101': {
      courseName: 'Learn Artificial Intelligence',
      questions: [
        {
          question: "What is Artificial Intelligence?",
          options: [
            "A type of hardware",
            "Programming that allows machines to mimic human intelligence",
            "A database system",
            "An operating system"
          ],
          correctAnswer: 1
        },
        {
          question: "Which of the following is a branch of AI?",
          options: [
            "Networking",
            "Cybersecurity",
            "Machine Learning",
            "Cloud Computing"
          ],
          correctAnswer: 2
        },
        {
          question: "Which programming language is widely used in AI development?",
          options: [
            "HTML",
            "Python",
            "CSS",
            "SQL"
          ],
          correctAnswer: 1
        },
        {
          question: "What does NLP stand for in AI?",
          options: [
            "Network Learning Protocol",
            "Neural Logic Path",
            "Natural Language Processing",
            "Numeric Learning Process"
          ],
          correctAnswer: 2
        },
        {
          question: "Which algorithm is commonly used for supervised learning?",
          options: [
            "K-means clustering",
            "Linear regression",
            "Apriori algorithm",
            "PageRank"
          ],
          correctAnswer: 1
        },
        {
          question: "What is the goal of reinforcement learning?",
          options: [
            "To train models on labeled data",
            "To minimize training time",
            "To make decisions through rewards and penalties",
            "To identify outliers"
          ],
          correctAnswer: 2
        },
        {
          question: "Which of the following is an example of an AI application?",
          options: [
            "Image filtering",
            "Spam email detection",
            "Printing documents",
            "Playing music"
          ],
          correctAnswer: 1
        },
        {
          question: "What is a neural network inspired by?",
          options: [
            "The solar system",
            "Human nervous system",
            "Internet architecture",
            "Mathematical functions"
          ],
          correctAnswer: 1
        },
        {
          question: "Which of these is a popular deep learning framework?",
          options: [
            "TensorFlow",
            "JQuery",
            "Bootstrap",
            "MongoDB"
          ],
          correctAnswer: 0
        },
        {
          question: "What is overfitting in AI models?",
          options: [
            "When the model trains too fast",
            "When the model performs well on training data but poorly on new data",
            "When the model ignores training data",
            "When the dataset is too large"
          ],
          correctAnswer: 1
        }
      ]
    },
    'AI102': {
      courseName: 'Machine Learning Full Course',
      questions: [
        {
          question: "What is Machine Learning?",
          options: [
            "Programming computers manually",
            "Teaching computers to learn from data",
            "Installing applications on computers",
            "Fixing computer hardware"
          ],
          correctAnswer: 1
        },
        {
          question: "Which of the following is a type of Machine Learning?",
          options: [
            "Supervised Learning",
            "Hyper Learning",
            "Neural Networking",
            "Intelligent Sorting"
          ],
          correctAnswer: 0
        },
        {
          question: "What is the goal of supervised learning?",
          options: [
            "To label data automatically",
            "To classify or predict output from input data",
            "To remove outliers",
            "To visualize graphs"
          ],
          correctAnswer: 1
        },
        {
          question: "Which algorithm is commonly used for classification?",
          options: [
            "Linear Regression",
            "K-Means Clustering",
            "Decision Trees",
            "Apriori"
          ],
          correctAnswer: 2
        },
        {
          question: "What is overfitting in Machine Learning?",
          options: [
            "Model fits training data too well and performs poorly on new data",
            "Model is too simple and performs well",
            "Model trains faster than expected",
            "Model stops training unexpectedly"
          ],
          correctAnswer: 0
        },
        {
          question: "Which of the following is an unsupervised learning algorithm?",
          options: [
            "K-Means Clustering",
            "Logistic Regression",
            "Random Forest",
            "Naive Bayes"
          ],
          correctAnswer: 0
        },
        {
          question: "What is the purpose of the train-test split?",
          options: [
            "To divide the data for training and evaluation",
            "To delete data points",
            "To normalize data",
            "To speed up processing"
          ],
          correctAnswer: 0
        },
        {
          question: "Which library is widely used in Python for Machine Learning?",
          options: [
            "NumPy",
            "Scikit-learn",
            "Matplotlib",
            "Seaborn"
          ],
          correctAnswer: 1
        },
        {
          question: "What is the output of a regression model?",
          options: [
            "A label",
            "A class",
            "A continuous value",
            "A cluster"
          ],
          correctAnswer: 2
        },
        {
          question: "Which technique is used to reduce the dimensions of data?",
          options: [
            "Clustering",
            "PCA (Principal Component Analysis)",
            "Classification",
            "Bagging"
          ],
          correctAnswer: 1
        }
      ]
    },
    'AI103': {
      courseName: 'Deep Learning Full Course',
      questions: [
        {
          question: "What is Deep Learning?",
          options: [
            "A method to analyze deep sea data",
            "A subfield of Machine Learning using neural networks with many layers",
            "Learning how to think deeply",
            "A new programming language"
          ],
          correctAnswer: 1
        },
        {
          question: "What is a neural network?",
          options: [
            "A network of social connections",
            "A type of hardware system",
            "A series of algorithms mimicking the human brain",
            "An internet protocol"
          ],
          correctAnswer: 2
        },
        {
          question: "Which activation function is most commonly used in deep networks?",
          options: [
            "Sigmoid",
            "Tanh",
            "ReLU",
            "Linear"
          ],
          correctAnswer: 2
        },
        {
          question: "What does CNN stand for in Deep Learning?",
          options: [
            "Central Neural Network",
            "Convolutional Neural Network",
            "Core Neural Node",
            "Control Node Network"
          ],
          correctAnswer: 1
        },
        {
          question: "What is the main purpose of a convolution layer in CNNs?",
          options: [
            "To normalize the data",
            "To downsample the data",
            "To detect patterns/features in input data",
            "To connect fully with all neurons"
          ],
          correctAnswer: 2
        },
        {
          question: "Which layer is typically used to reduce the spatial dimensions of the data?",
          options: [
            "Dense Layer",
            "Convolutional Layer",
            "Dropout Layer",
            "Pooling Layer"
          ],
          correctAnswer: 3
        },
        {
          question: "What is the purpose of dropout in deep neural networks?",
          options: [
            "To increase the size of the model",
            "To make the model train faster",
            "To prevent overfitting",
            "To boost the accuracy immediately"
          ],
          correctAnswer: 2
        },
        {
          question: "Which deep learning framework is developed by Google?",
          options: [
            "PyTorch",
            "Keras",
            "TensorFlow",
            "Theano"
          ],
          correctAnswer: 2
        },
        {
          question: "What kind of problems are RNNs best suited for?",
          options: [
            "Image classification",
            "Time-series and sequential data",
            "Database sorting",
            "Clustering"
          ],
          correctAnswer: 1
        },
        {
          question: "Which of the following is a variant of RNN used for long-term dependencies?",
          options: [
            "CNN",
            "LSTM",
            "DNN",
            "ReLU"
          ],
          correctAnswer: 1
        }
      ]
    },
    'DE101': {
      courseName: 'Data Science Full Course',
      questions: [
        {
          question: "What is the first step in the Data Science process?",
          options: [
            "Model training",
            "Data collection",
            "Data visualization",
            "Prediction"
          ],
          correctAnswer: 1
        },
        {
          question: "Which of the following is a common language for Data Science?",
          options: [
            "Java",
            "Python",
            "HTML",
            "PHP"
          ],
          correctAnswer: 1
        },
        {
          question: "What does EDA stand for?",
          options: [
            "Electronic Data Aggregation",
            "Exploratory Data Analysis",
            "Estimated Data Architecture",
            "Enhanced Data Algorithms"
          ],
          correctAnswer: 1
        },
        {
          question: "What type of chart is best for showing distribution?",
          options: [
            "Bar chart",
            "Pie chart",
            "Histogram",
            "Line chart"
          ],
          correctAnswer: 2
        },
        {
          question: "Which library is commonly used in Python for data manipulation?",
          options: [
            "NumPy",
            "Pandas",
            "Matplotlib",
            "TensorFlow"
          ],
          correctAnswer: 1
        },
        {
          question: "What is the purpose of feature engineering?",
          options: [
            "To create new data",
            "To clean corrupted files",
            "To improve model performance by transforming raw data",
            "To build machine learning models"
          ],
          correctAnswer: 2
        },
        {
          question: "Which algorithm is used for classification problems?",
          options: [
            "Linear Regression",
            "K-Nearest Neighbors (KNN)",
            "K-Means",
            "PCA"
          ],
          correctAnswer: 1
        },
        {
          question: "What does 'Big Data' refer to?",
          options: [
            "Data from large companies",
            "Data that is too large or complex for traditional tools",
            "Historical data",
            "Real-time data"
          ],
          correctAnswer: 1
        },
        {
          question: "Which of the following is a data visualization tool?",
          options: [
            "Excel",
            "Tableau",
            "Photoshop",
            "TensorFlow"
          ],
          correctAnswer: 1
        },
        {
          question: "What is the goal of data science?",
          options: [
            "To design websites",
            "To store data securely",
            "To extract insights and knowledge from data",
            "To build operating systems"
          ],
          correctAnswer: 2
        }
      ]
    },
    'CSEC101': {
      courseName: 'Learn Ethical Hacking',
      questions: [
        {
          question: "What is ethical hacking?",
          options: [
            "Hacking for personal gain",
            "Unauthorized access to systems",
            "Legal testing of systems for vulnerabilities",
            "Spying on competitors"
          ],
          correctAnswer: 2
        },
        {
          question: "Which of the following is a common phase in ethical hacking?",
          options: [
            "Exploitation",
            "Phishing",
            "Malware injection",
            "All of the above"
          ],
          correctAnswer: 0
        },
        {
          question: "What tool is commonly used for network scanning?",
          options: [
            "Photoshop",
            "Nmap",
            "Notepad++",
            "GitHub"
          ],
          correctAnswer: 1
        },
        {
          question: "What does SQL Injection target?",
          options: [
            "Network ports",
            "Operating system",
            "Database queries",
            "Cloud storage"
          ],
          correctAnswer: 2
        },
        {
          question: "What is penetration testing?",
          options: [
            "Installing firewalls",
            "Monitoring server logs",
            "Simulating cyberattacks to test security",
            "Training employees"
          ],
          correctAnswer: 2
        },
        {
          question: "Which tool is used for password cracking?",
          options: [
            "Hydra",
            "Nmap",
            "Docker",
            "Wireshark"
          ],
          correctAnswer: 0
        },
        {
          question: "Which of the following is a wireless network attack?",
          options: [
            "DoS attack",
            "MITM (Man in the Middle)",
            "ARP spoofing",
            "All of the above"
          ],
          correctAnswer: 3
        },
        {
          question: "Which Linux distribution is most commonly used in ethical hacking?",
          options: [
            "Ubuntu",
            "Fedora",
            "Kali Linux",
            "Mint"
          ],
          correctAnswer: 2
        },
        {
          question: "What is social engineering in cybersecurity?",
          options: [
            "Exploiting software bugs",
            "Using malware to infect systems",
            "Manipulating people to give confidential info",
            "Guessing passwords"
          ],
          correctAnswer: 2
        },
        {
          question: "Which protocol is secure for website communication?",
          options: [
            "HTTP",
            "FTP",
            "SMTP",
            "HTTPS"
          ],
          correctAnswer: 3
        }
      ]
    },
    'CSEC102': {
      courseName: 'Learn Networking For Cyber Security',
      questions: [
        {
          question: "What is the primary purpose of networking in cybersecurity?",
          options: [
            "To watch videos online",
            "To enable secure communication between systems",
            "To increase computer speed",
            "To design graphics"
          ],
          correctAnswer: 1
        },
        {
          question: "What does IP stand for?",
          options: [
            "Internet Protocol",
            "Internal Program",
            "Intranet Packet",
            "Instant Process"
          ],
          correctAnswer: 0
        },
        {
          question: "Which device is used to connect multiple networks together?",
          options: [
            "Switch",
            "Router",
            "Repeater",
            "Modem"
          ],
          correctAnswer: 1
        },
        {
          question: "What is the role of a firewall?",
          options: [
            "Increase internet speed",
            "Enhance display settings",
            "Prevent unauthorized access to or from a network",
            "Fix hardware issues"
          ],
          correctAnswer: 2
        },
        {
          question: "Which of the following is a common network attack?",
          options: [
            "DDoS",
            "Bluetooth pairing",
            "IP allocation",
            "LAN configuration"
          ],
          correctAnswer: 0
        },
        {
          question: "What protocol is used for secure communication over the internet?",
          options: [
            "FTP",
            "HTTP",
            "HTTPS",
            "SMTP"
          ],
          correctAnswer: 2
        },
        {
          question: "What does DNS stand for?",
          options: [
            "Data Network System",
            "Domain Name System",
            "Dynamic Node Server",
            "Download Name Service"
          ],
          correctAnswer: 1
        },
        {
          question: "What is a MAC address?",
          options: [
            "A physical address assigned to a network interface",
            "A software license key",
            "A user password",
            "A CPU serial number"
          ],
          correctAnswer: 0
        },
        {
          question: "Which OSI layer handles encryption and decryption?",
          options: [
            "Transport",
            "Session",
            "Presentation",
            "Data Link"
          ],
          correctAnswer: 2
        },
        {
          question: "Which port is typically used by HTTPS?",
          options: [
            "80",
            "20",
            "21",
            "443"
          ],
          correctAnswer: 3
        }
      ]
    },
    'PROG101': {
      courseName: 'Learn C++ Language',
      questions: [
        {
          question: "Who developed the C++ programming language?",
          options: [
            "Dennis Ritchie",
            "James Gosling",
            "Bjarne Stroustrup",
            "Guido van Rossum"
          ],
          correctAnswer: 2
        },
        {
          question: "Which of the following is a correct way to declare a variable in C++?",
          options: [
            "int = number;",
            "num int;",
            "int number;",
            "integer number;"
          ],
          correctAnswer: 2
        },
        {
          question: "What is the correct syntax to output 'Hello World' in C++?",
          options: [
            "cout << 'Hello World';",
            "print('Hello World');",
            "System.out.println('Hello World');",
            "printf('Hello World');"
          ],
          correctAnswer: 0
        },
        {
          question: "Which header file is needed to use `cout` and `cin`?",
          options: [
            "#include <iostream>",
            "#include <stdio.h>",
            "#include <conio.h>",
            "#include <stdlib.h>"
          ],
          correctAnswer: 0
        },
        {
          question: "What is the output of `5 / 2` in C++?",
          options: [
            "2.5",
            "2",
            "3",
            "Compilation Error"
          ],
          correctAnswer: 1
        },
        {
          question: "Which concept allows the same function name to work with different types?",
          options: [
            "Inheritance",
            "Polymorphism",
            "Encapsulation",
            "Abstraction"
          ],
          correctAnswer: 1
        },
        {
          question: "Which of the following is used to define a class in C++?",
          options: [
            "object",
            "define",
            "function",
            "class"
          ],
          correctAnswer: 3
        },
        {
          question: "Which of the following is a loop construct in C++?",
          options: [
            "repeat-until",
            "loop",
            "foreach",
            "for"
          ],
          correctAnswer: 3
        },
        {
          question: "Which of the following creates an object of a class named `Car`?",
          options: [
            "Car;",
            "Car car;",
            "car = Car();",
            "create Car;"
          ],
          correctAnswer: 1
        },
        {
          question: "What does the `new` keyword do in C++?",
          options: [
            "Defines a new variable",
            "Deletes a variable",
            "Allocates memory dynamically",
            "Initializes a loop"
          ],
          correctAnswer: 2
        }
      ]
    },
    'PROG102': {
        courseName: 'Python Ultimate Course',
        questions: [
          {
            question: "What is Python?",
            options: [
              "A snake",
              "A programming language",
              "A web browser",
              "A database"
            ],
            correctAnswer: 1
          },
          {
            question: "What symbol is used to start a comment in Python?",
            options: [
              "#",
              "//",
              "--",
              "/* */"
            ],
            correctAnswer: 0
          },
          {
            question: "Which keyword is used to define a function?",
            options: [
              "func",
              "def",
              "function",
              "define"
            ],
            correctAnswer: 1
          },
          {
            question: "What will `len('Hello')` return?",
            options: [
              "4",
              "6",
              "5",
              "None"
            ],
            correctAnswer: 2
          },
          {
            question: "How do you insert comments in Python?",
            options: [
              "// this is a comment",
              "# this is a comment",
              "<!-- this is a comment -->",
              "/* this is a comment */"
            ],
            correctAnswer: 1
          },
          {
            question: "Which data type is immutable in Python?",
            options: [
              "List",
              "Set",
              "Dictionary",
              "Tuple"
            ],
            correctAnswer: 3
          },
          {
            question: "Which of the following is a Python data structure?",
            options: [
              "Stack",
              "Tuple",
              "Tree",
              "Graph"
            ],
            correctAnswer: 1
          },
          {
            question: "What is the output of `2 ** 3`?",
            options: [
              "6",
              "9",
              "8",
              "5"
            ],
            correctAnswer: 2
          },
          {
            question: "What is used to handle exceptions in Python?",
            options: [
              "try-catch",
              "try-handle",
              "try-except",
              "do-except"
            ],
            correctAnswer: 2
          },
          {
            question: "Which module is used for working with regular expressions in Python?",
            options: [
              "regex",
              "re",
              "match",
              "exp"
            ],
            correctAnswer: 1
          }
        ]
    },
    'PROG103': {
      courseName: 'Learn Java Full Course',
      questions: [
        {
          question: "Which of these is a correct way to declare a variable in Java?",
          options: [
            "int number = 5;",
            "number int = 5;",
            "int = number 5;",
            "declare int number = 5;"
          ],
          correctAnswer: 0
        },
        {
          question: "What is the entry point of a Java program?",
          options: [
            "main() method",
            "start() method",
            "run() method",
            "init() method"
          ],
          correctAnswer: 0
        },
        {
          question: "Which keyword is used to inherit a class in Java?",
          options: [
            "implement",
            "extends",
            "inherits",
            "super"
          ],
          correctAnswer: 1
        },
        {
          question: "What does JVM stand for?",
          options: [
            "Java Variable Machine",
            "Java Virtual Machine",
            "Java Verified Method",
            "Java Visual Module"
          ],
          correctAnswer: 1
        },
        {
          question: "Which data type is used to store true or false values?",
          options: [
            "int",
            "boolean",
            "String",
            "char"
          ],
          correctAnswer: 1
        },
        {
          question: "Which of these is NOT a Java access modifier?",
          options: [
            "private",
            "protected",
            "public",
            "internal"
          ],
          correctAnswer: 3
        },
        {
          question: "What is the correct way to create an object of class Car?",
          options: [
            "Car obj = new Car();",
            "Car obj = Car();",
            "new Car obj = Car();",
            "Car obj = create Car();"
          ],
          correctAnswer: 0
        },
        {
          question: "Which exception is thrown when a program attempts to divide by zero?",
          options: [
            "IOException",
            "ArithmeticException",
            "NullPointerException",
            "ArrayIndexOutOfBoundsException"
          ],
          correctAnswer: 1
        },
        {
          question: "What is method overloading?",
          options: [
            "Multiple methods with the same name but different parameters",
            "A method that calls itself",
            "Using methods from parent class",
            "Converting one data type to another"
          ],
          correctAnswer: 0
        },
        {
          question: "Which of these is a Java collection framework interface?",
          options: [
            "List",
            "Array",
            "String",
            "Object"
          ],
          correctAnswer: 0
        }
      ]
    },
    'PROG104': {
      courseName: 'Ruby For Beginners',
      questions: [
        {
          question: "How do you define a variable in Ruby?",
          options: [
            "var x = 10",
            "x = 10",
            "int x = 10",
            "let x = 10"
          ],
          correctAnswer: 1
        },
        {
          question: "Which symbol is used to denote an instance variable in Ruby?",
          options: [
            "@",
            "$",
            "#",
            "%"
          ],
          correctAnswer: 0
        },
        {
          question: "What method is used to output text to the console in Ruby?",
          options: [
            "print()",
            "echo()",
            "puts()",
            "console.log()"
          ],
          correctAnswer: 2
        },
        {
          question: "How do you start a comment in Ruby?",
          options: [
            "//",
            "#",
            "/*",
            "<!--"
          ],
          correctAnswer: 1
        },
        {
          question: "What does the 'def' keyword do in Ruby?",
          options: [
            "Defines a method",
            "Declares a variable",
            "Imports a module",
            "Creates a loop"
          ],
          correctAnswer: 0
        },
        {
          question: "Which method converts a string to an integer in Ruby?",
          options: [
            "to_int()",
            "to_i()",
            "int()",
            "parseInt()"
          ],
          correctAnswer: 1
        },
        {
          question: "What is the correct way to create an array in Ruby?",
          options: [
            "array = []",
            "array = {}",
            "array = ()",
            "array = <>"
          ],
          correctAnswer: 0
        },
        {
          question: "Which of the following is NOT a Ruby data type?",
          options: [
            "String",
            "Integer",
            "Float",
            "Character"
          ],
          correctAnswer: 3
        },
        {
          question: "How do you write a loop that repeats 5 times in Ruby?",
          options: [
            "for i in 1..5",
            "5.times do",
            "while i < 5",
            "loop 5 times"
          ],
          correctAnswer: 1
        },
        {
          question: "Which keyword is used to create a class in Ruby?",
          options: [
            "class",
            "struct",
            "object",
            "module"
          ],
          correctAnswer: 0
        }
      ]
    }
  };

  getQuizByCourseId(courseId: string): any[] {
    const course = this.quizData[courseId as keyof typeof this.quizData];
    return course ? course.questions : this.getDefaultQuiz();
  }

  getCourseNameById(courseId: string): string {
    const course = this.quizData[courseId as keyof typeof this.quizData];
    return course ? course.courseName : 'General';
  }

  private getDefaultQuiz(): any[] {
    // Return a default quiz if course not found
    return [
      {
        question: "What is programming?",
        options: [
          "Writing instructions for computers",
          "Playing games",
          "Watching videos",
          "Reading books"
        ],
        correctAnswer: 0
      }
      // ... more default questions
    ];
  }

  // Method to add new quiz
  addQuiz(courseId: string, courseName: string, questions: any[]) {
    this.quizData[courseId as keyof typeof this.quizData] = {
      courseName,
      questions
    };
  }
}
