#Welcome to DiSPATCH.

Overview This is an interactive news application, enabling a user to search world news by clicking different countries on a map. If a user selects two or more countries, the application will return articles that are relevant to all countries involved. One country selections will return articles mentioning just that country. The purpose of this application is to encourage a curiousity with global affairs through a fun, interactive map, while also providing a novel approach to international news consumption through a multiple country search function.

#Approach 

This application would require a world map with clickable country polygons and news api's to provide relevant articles from various sources. Google Maps was ultimately sacrificed for a more abstracted amCharts map service, that provides a much cleaner and lightweight map implementation.

Because of the enormous scale of searching news of any country on Earth, the application would require a very large number of articles available to search in order to provide a user with data. The application, therefore, draws articles from both EventRegistry and NewsAPI. When the application is started, API calls are made and the articles are cached, enabling a user to perform various individual or combined country searches.

If there are relevant articles, their images, clickable titles, and descriptions are displayed to the user in RSS feed style.

#Primary Challenges

Because of the large volume of articles required for this application, it required implementing multiple API's. Some of these API's are quite limited in the articles returned (10 per call, per source for NewsApi). Additionally, the JSON of NewsApi is quite limited.
EventRegistry provides, by far, the largest volume of JSON data, with the most sources, and the most flexible and customizable API searching, it seems, of any news API currently available. This API was crucial to making this application usable. Still, the maximum search volume per API call (per source) is 200 articles - much larger than the others, but also limited in terms of the desired volume. With this in mind, top international news sources are used in this app so as to be frugal and efficient with the API calls made.

The news API's do not provide searches by country. This makes a dynamic call to the Api by the user currently unattainable, hence the caching of articles when the application is loaded. Additionally, this requires a custom search function to find relevant articles to the country selected. A custom search function was made to map the names of selected countries to the cached article titles and descriptions. When a user clicks a country on the map, that country name is pushed to an array; however, it is not effective to simply map country names to the titles and descriptions, as there are many articles that use semantically equivalent keywords, but do not mention the country itself (e.g. "United States" may be equivalent to "U.S.", "America", "Trump", etc.).
The implemented solution checks to see if a country is selected, and if so, pushes a hard-coded array of semantically equivalent keywords to an empty array, that will then be mapped against the cached articles when a user hits 'Search'. This approach provides a far greater volume of articles to the user.

#Conclusion 

This application has been great fun to make, and has provided me with improved skills in Angular, Node, Javascript, HTML, CSS, API's and JSON's, as well as with new ideas (within news, music, and history) that could be implemented in this same format. Enjoy the application, and please feel free to message me with feedback or any ideas you may have. I am open to collaborating on a continued build of this application.
