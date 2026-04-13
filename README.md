<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pocket Pyme - Frontend</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f7f6;
        }
        header {
            border-bottom: 3px solid #1976d2;
            margin-bottom: 20px;
            padding-bottom: 10px;
        }
        h1 {
            color: #1976d2;
            margin-bottom: 10px;
        }
        h2 {
            color: #2c3e50;
            border-left: 5px solid #1976d2;
            padding-left: 10px;
            margin-top: 30px;
        }
        .intro {
            font-size: 1.1em;
            color: #555;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            background: #fff;
            margin-bottom: 10px;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        li strong {
            color: #1976d2;
            display: block;
            margin-bottom: 5px;
        }
        .stack-list li {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .badge {
            background-color: #e3f2fd;
            color: #1976d2;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 0.9em;
            font-weight: bold;
        }
    </style>
</head>
<body>

    <header>
        <h1>Pocket Pyme - Frontend 🚀</h1>
        <p class="intro">
            <strong>Pocket Pyme</strong> es una plataforma web diseñada para digitalizar y potenciar el crecimiento de pequeñas y medianas empresas. 
            Este frontend proporciona una interfaz intuitiva para que los emprendedores gestionen su catálogo, editen su información de contacto 
            y capturen nuevos clientes de manera eficiente.
        </p>
    </header>

    <section>
        <h2>📋 Características Principales</h2>
        <ul>
            <li>
                <strong>Registro de Empresas</strong>
                Flujo de onboarding para que nuevas pymes se integren a la plataforma de manera sencilla.
            </li>
            <li>
                <strong>Catálogo de Productos y Servicios</strong>
                Panel administrativo completo para agregar, editar y listar toda la oferta comercial del negocio.
            </li>
            <li>
                <strong>Perfil de Contacto</strong>
                Herramientas de edición para mantener actualizados los datos de contacto y optimizar la captación de leads.
            </li>
            <li>
                <strong>Dashboard Moderno</strong>
                Interfaz limpia, rápida y funcional basada en estándares de diseño profesionales para una mejor gestión.
            </li>
        </ul>
    </section>

    <section>
        <h2>🛠️ Stack Tecnológico</h2>
        <p>El proyecto utiliza un stack moderno para garantizar la escalabilidad y una excelente experiencia de usuario:</p>
        <ul class="stack-list">
            <li>
                <span>Core</span>
                <span class="badge">React (Functional Components & Hooks)</span>
            </li>
            <li>
                <span>Lenguaje</span>
                <span class="badge">TypeScript</span>
            </li>
            <li>
                <span>Interfaz de Usuario</span>
                <span class="badge">Material UI (MUI)</span>
            </li>
            <li>
                <span>Gestión de Estado</span>
                <span class="badge">Context API / Redux</span>
            </li>
            <li>
                <span>Consumo de API</span>
                <span class="badge">Axios / Fetch</span>
            </li>
        </ul>
    </section>

</body>
</html>
