<html>
<head>
    <Title>ChrossChx</Title>
</head>
<body class="body">
<asset:stylesheet src="railroadRouts.css"/>
<g:javascript>
    window.grailsSupport = {
        islandUrl : '${assetPath(src: 'island.png')}'
    }
</g:javascript>
<script src="js/dependencies.js"></script>
<script src="js/railroadRoute.js"></script>
<div  ng-app="railroadRoute">
    <railroad-route></railroad-route>
</div>
</body>
</html>