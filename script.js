document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-button');
    const contentSections = document.querySelectorAll('.content-section');
    const quizContainer = document.getElementById('quiz-container');

    // Navegación por secciones
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;

            // Ocultar todas las secciones y quitar clase activa de botones
            contentSections.forEach(section => section.classList.remove('active'));
            navButtons.forEach(btn => btn.classList.remove('active'));

            // Mostrar la sección target y marcar botón como activo
            document.getElementById(targetId).classList.add('active');
            button.classList.add('active');

            // Scroll al inicio de la sección, considerando el header fijo
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                 window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - 10, // 10px de margen extra
                    behavior: 'smooth'
                });
            }
        });
    });

    // Datos del Quiz (Preguntas, opciones, respuesta correcta, explicación)
    const quizData = [
        // PDF 1
        {
            question: "¿Qué es un Sistema Gestor de Bases de Datos (SGBD)?",
            options: {
                a: "Una colección de datos.",
                b: "El hardware donde se almacenan los datos.",
                c: "Un conjunto de programas para crear y gestionar bases de datos.",
                d: "Un tipo de modelo de datos."
            },
            correct: "c",
            explanation: "Un SGBD es el software que permite interactuar con la base de datos (colección de datos)."
        },
        {
            question: "El modelo que organiza los datos en tablas, filas y columnas es el:",
            options: {
                a: "Jerárquico",
                b: "Relacional",
                c: "De Red",
                d: "Orientado a Objetos"
            },
            correct: "b",
            explanation: "El modelo Relacional es el más común y utiliza tablas. Se consulta con SQL."
        },
        {
            question: "Un 'dato estático' es aquel que...",
            options: {
                a: "Nunca cambia su valor.",
                b: "Su tamaño en memoria no varía durante la ejecución.",
                c: "Se genera dinámicamente.",
                d: "Solo puede ser numérico."
            },
            correct: "b",
            explanation: "Los datos estáticos tienen un tamaño fijo en memoria una vez declarados."
        },
        {
            question: "¿Cuál de estos NO es un actor principal en una base de datos?",
            options: {
                a: "Administrador de BD (ABD)",
                b: "Diseñador de BD",
                c: "Usuario Final",
                d: "Proveedor de Internet"
            },
            correct: "d",
            explanation: "El ABD, diseñador y usuario final interactúan directamente con la BD o su sistema."
        },
        {
            question: "El modelo Entidad-Relación (E-R) se utiliza principalmente para:",
            options: {
                a: "Programar las consultas SQL.",
                b: "El diseño conceptual de la base de datos.",
                c: "Administrar la seguridad de los usuarios.",
                d: "Optimizar el rendimiento del SGBD."
            },
            correct: "b",
            explanation: "El E-R es una herramienta de diseño que ayuda a modelar la estructura de la BD antes de implementarla."
        },

        // PDF 2
        {
            question: "¿Qué significa ACID en el contexto de transacciones de BD?",
            options: {
                a: "Acceso, Control, Integridad, Durabilidad",
                b: "Atomicidad, Consistencia, Aislamiento, Durabilidad",
                c: "Archivo, Conexión, Información, Datos",
                d: "Actualización, Creación, Interrogación, Definición"
            },
            correct: "b",
            explanation: "ACID son las propiedades que garantizan la fiabilidad de las transacciones: Atomicidad, Consistencia, Aislamiento y Durabilidad."
        },
        {
            question: "La escalabilidad horizontal implica:",
            options: {
                a: "Aumentar la RAM de un servidor.",
                b: "Distribuir la carga entre múltiples servidores.",
                c: "Comprar un disco duro más grande.",
                d: "Optimizar las consultas SQL."
            },
            correct: "b",
            explanation: "La escalabilidad horizontal añade más máquinas al sistema, mientras que la vertical mejora una sola máquina."
        },
        {
            question: "¿Cuál es el propósito principal de los índices en una BD?",
            options: {
                a: "Asegurar la integridad de los datos.",
                b: "Acelerar las búsquedas de datos.",
                c: "Facilitar los backups.",
                d: "Controlar el acceso concurrente."
            },
            correct: "b",
            explanation: "Los índices funcionan como el índice de un libro, permitiendo localizar datos más rápidamente."
        },
        {
            question: "Un ejemplo de SGBD NoSQL de tipo Documental es:",
            options: {
                a: "MySQL",
                b: "PostgreSQL",
                c: "MongoDB",
                d: "Redis"
            },
            correct: "c",
            explanation: "MongoDB es un SGBD NoSQL orientado a documentos. Redis es Clave-Valor. MySQL y PostgreSQL son relacionales (SQL)."
        },
        {
            question: "RPO (Recovery Point Objective) se refiere a:",
            options: {
                a: "El tiempo máximo para restaurar el servicio.",
                b: "La cantidad máxima de pérdida de datos aceptable.",
                c: "El protocolo de optimización de recuperación.",
                d: "El punto de restauración más reciente."
            },
            correct: "b",
            explanation: "RPO define cuántos datos (medidos en tiempo, ej: última hora) se pueden perder como máximo en caso de un desastre."
        },

        // PDF 3
        {
            question: "En el modelo E-R, la cardinalidad 'Uno a Muchos' (1:N) significa:",
            options: {
                a: "Una instancia de A se relaciona con una de B, y viceversa.",
                b: "Una instancia de A se relaciona con varias de B, pero una de B solo con una de A.",
                c: "Varias instancias de A se relacionan con varias de B.",
                d: "Una instancia de A se relaciona consigo misma."
            },
            correct: "b",
            explanation: "Ejemplo: Un CLIENTE (A) puede tener muchos PEDIDOS (B), pero un PEDIDO pertenece a un solo CLIENTE."
        },
        {
            question: "Un atributo que se puede dividir en partes más pequeñas con significado propio se llama:",
            options: {
                a: "Simple",
                b: "Derivado",
                c: "Multivaluado",
                d: "Compuesto"
            },
            correct: "d",
            explanation: "Por ejemplo, 'Dirección' es compuesto si se divide en Calle, Ciudad, CP."
        },
        {
            question: "La 'Llave Primaria' (PK) de una entidad sirve para:",
            options: {
                a: "Relacionarla con otras entidades.",
                b: "Identificar de forma única cada instancia de la entidad.",
                c: "Almacenar el atributo más importante.",
                d: "Ordenar los datos automáticamente."
            },
            correct: "b",
            explanation: "La PK garantiza que cada fila (instancia) en una tabla (entidad) sea única."
        },
        {
            question: "¿Cómo se representa un atributo multivaluado en un diagrama E-R (notación común)?",
            options: {
                a: "Con un óvalo simple.",
                b: "Con un rectángulo.",
                c: "Con un doble óvalo.",
                d: "Con un óvalo punteado."
            },
            correct: "c",
            explanation: "Un doble óvalo indica que el atributo puede tener múltiples valores para una entidad (ej: varios teléfonos para una persona)."
        },
        {
            question: "Si un 'Libro' puede ser escrito por varios 'Autores', y un 'Autor' puede escribir varios 'Libros', ¿qué tipo de cardinalidad es?",
            options: {
                a: "1:1",
                b: "1:N",
                c: "N:1",
                d: "N:N"
            },
            correct: "d",
            explanation: "Esta es una relación Muchos a Muchos (N:N)."
        },

        // PDF 4
        {
            question: "Al transformar una relación N:M del modelo E-R al relacional, ¿qué se crea?",
            options: {
                a: "Se añade una FK en una de las tablas existentes.",
                b: "Una nueva tabla intermedia (asociativa).",
                c: "Se fusionan las dos entidades en una sola tabla.",
                d: "Un atributo multivaluado."
            },
            correct: "b",
            explanation: "Las relaciones N:M siempre generan una nueva tabla que contiene las PKs de las tablas relacionadas como FKs."
        },
        {
            question: "En el modelo relacional, una 'Tupla' es equivalente a:",
            options: {
                a: "Una columna",
                b: "Una tabla",
                c: "Una fila o registro",
                d: "Una llave foránea"
            },
            correct: "c",
            explanation: "Tupla es el término formal para una fila o registro en una tabla relacional."
        },
        {
            question: "El 'Grado' de una relación (tabla) en el modelo relacional se refiere al:",
            options: {
                a: "Número de filas.",
                b: "Número de columnas.",
                c: "Número de llaves foráneas.",
                d: "Nivel de normalización."
            },
            correct: "b",
            explanation: "El grado es la cantidad de atributos (columnas) que tiene la tabla."
        },
        {
            question: "El comando SQL `CREATE TABLE` se usa para:",
            options: {
                a: "Insertar datos en una tabla.",
                b: "Definir la estructura de una nueva tabla.",
                c: "Consultar datos de una tabla.",
                d: "Crear una nueva base de datos."
            },
            correct: "b",
            explanation: "`CREATE TABLE` define las columnas, tipos de datos y restricciones de una tabla."
        },
        {
            question: "El objetivo principal de la Normalización es:",
            options: {
                a: "Acelerar las consultas.",
                b: "Minimizar la redundancia de datos y mejorar la integridad.",
                c: "Facilitar la creación de backups.",
                d: "Aumentar el número de tablas."
            },
            correct: "b",
            explanation: "La normalización organiza los datos para evitar duplicaciones innecesarias y problemas de inconsistencia."
        }
        // Puedes añadir más preguntas aquí (hasta 50)
        // ... (Añadí 20, puedes expandir con más detalle de los PDFs)
    ];

    function buildQuiz() {
        quizData.forEach((currentQuestion, questionNumber) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('quiz-question-container');

            let optionsHtml = '';
            for (const letter in currentQuestion.options) {
                optionsHtml += `
                    <label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter.toUpperCase()}: ${currentQuestion.options[letter]}
                    </label>
                `;
            }

            questionDiv.innerHTML = `
                <p class="quiz-question-text">${questionNumber + 1}. ${currentQuestion.question}</p>
                <div class="options">${optionsHtml}</div>
                <button class="check-answer-btn" data-question="${questionNumber}">Verificar</button>
                <div class="feedback"></div>
            `;
            quizContainer.appendChild(questionDiv);
        });

        // Añadir event listeners a los botones de verificar
        document.querySelectorAll('.check-answer-btn').forEach(button => {
            button.addEventListener('click', showAnswer);
        });
    }

    function showAnswer(event) {
        const questionNumber = parseInt(event.target.dataset.question);
        const currentQuizQuestion = quizData[questionNumber];
        const questionContainer = event.target.closest('.quiz-question-container');
        const feedbackDiv = questionContainer.querySelector('.feedback');
        const selectedOption = questionContainer.querySelector(`input[name="question${questionNumber}"]:checked`);

        if (!selectedOption) {
            feedbackDiv.innerHTML = "<p>Por favor, selecciona una opción.</p>";
            feedbackDiv.className = 'feedback incorrect'; // re-usamos clase para estilo
            return;
        }

        const userAnswer = selectedOption.value;
        if (userAnswer === currentQuizQuestion.correct) {
            feedbackDiv.innerHTML = `<p><strong>¡Correcto!</strong></p><p>${currentQuizQuestion.explanation}</p>`;
            feedbackDiv.className = 'feedback correct';
        } else {
            feedbackDiv.innerHTML = `<p><strong>Incorrecto.</strong> La respuesta correcta era la ${currentQuizQuestion.correct.toUpperCase()}.</p><p>${currentQuizQuestion.explanation}</p>`;
            feedbackDiv.className = 'feedback incorrect';
        }
        // Deshabilitar opciones y botón después de verificar para evitar cambios
        questionContainer.querySelectorAll('input[type="radio"]').forEach(input => input.disabled = true);
        event.target.disabled = true;
        event.target.style.backgroundColor = '#ccc'; // Indicar que está deshabilitado
    }

    buildQuiz(); // Construir el quiz al cargar la página

});