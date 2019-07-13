from waitress import serve
from pyramid.config import Configurator
from pyramid.response import Response


def hello_world(request):
    print('Incoming request')
    return Response('''
                    <style>
                        .header {
                            
                            color: orange ;
                            background-color: black ;
                            # margin-left: auto ;
                            # margin-right: auto ;
                            margin-bottom: 0 ;
                            text-align: center ;
                                                        width: 100% ;
                            # height: 2em ;
                        }
                        body {
                            # width: 100% ;
                            margin: 0 0 0 0 ;
                        }
                        .movie-list {
                            top: 0 ;
                            display: flex ;
                            # flex-direction: row ;
                            justify-content: space-between ;
                            background-color: orange ;
                            # width: 100% !important;

                        }
                        .img-container {
                            flex: 0 ;
                            order: 0 ;
                            padding-top: 1.5em ;
                            height: 20em ;
                            padding-left: 1.5em ;
                            padding-right: 1.5em ;
                        }
                        img{
                            height: 16em ;
                            width: 10em ;
                        }
                        p {
                            text-align: center ;
                        }
                          
                    </style>
                    <body>
                        <h1 class='header'>Tonder Horror Movie Gallery</h1>
                        <div class='movie-list'>
        
                            <div class='img-container'>
                                <img src='https://images-na.ssl-images-amazon.com/images/I/71VEG8A3B3L.gif'></img>
                                <p>Halloween(1978)</p>
                            </div>

                            <div class='img-container'>
                               <img src='https://i.pinimg.com/736x/59/c2/1d/59c21dbe7a7fa7ba4d2d22e2a9e699ce.jpg'></img>
                               <p> Halloween(2018)</p>
                            </div>

                             <div class='img-container'>
                               <img src='https://images-na.ssl-images-amazon.com/images/I/51NWM9VRH3L._SY445_.jpg'></img>
                               <p> Scream(1996)</p>
                            </div>

                            <div class='img-container'>
                               <img src='https://static1.squarespace.com/static/511eea22e4b06642027a9a99/t/537eab87e4b0367ce1b8b74f/1400810375466/Silent+Hill.jpg'></img>
                               <p> Silent Hill(2006)</p>
                            </div>

                            <div class='img-container'>
                               <img src='https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/Cult_of_Chucky_theatrical_poster.jpg/220px-Cult_of_Chucky_theatrical_poster.jpg'></img>
                               <p> Cult of Chucky(2017)</p>
                            </div>

                            <div class='img-container'>
                                <img src='https://vpxfilms.com/wp-content/uploads/poster-for-the-movie-the-hills-have-eyes-1977.jpg'></img>
                                <p> The Hills Have Eyes(2006)</p>
                            </div>


                            

                        </div>

                    </body>''')


if __name__ == '__main__':
    with Configurator() as config:
        config.add_route('hello', '/')
        config.add_view(hello_world, route_name='hello')
        app = config.make_wsgi_app()
    serve(app, host='0.0.0.0', port=6543)