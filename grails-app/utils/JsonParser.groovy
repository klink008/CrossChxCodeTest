import groovy.json.JsonSlurper

class JsonParser {
    public static def parseJsonFile(String filePath){
        def reader = new BufferedReader(
                new FileReader(filePath)
        )
        def slurper = new JsonSlurper()
        slurper.parse(reader)
    }
}
