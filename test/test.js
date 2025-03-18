describe('GridLayer', function () {
    var container, map;
    beforeEach(function () {
        container = document.createElement('div');
        container.style.width = '400px';
        container.style.height = '300px';
        document.body.appendChild(container);
        map = new maptalks.Map(container, {
            center : [0, 0],
            zoom : 17
        });
    });

    afterEach(function () {
        map.remove();
        maptalks.DomUtil.removeDomNode(container);
    });

    it('add to map', function (done) {
        var layer = new maptalks.GridLayer('g', {
            projection : true,
            center : map.getCenter(),
            width : 100,
            height : 100,
            cols : [-5, 5],
            rows : [-5, 5]
        }, {
            renderer : 'canvas'
        });
        layer.on('layerload', function () {
            expect(layer).to.be.painted();
            done();
        })
         .addTo(map);
    });

    it('add to map with altitude', function (done) {
        var layer = new maptalks.GridLayer('g', {
            projection : true,
            center : map.getCenter(),
            width : 100,
            height : 100,
            altitude: 100,
            cols : [-5, 5],
            rows : [-5, 5]
        }, {
            renderer : 'canvas'
        });
        layer.on('layerload', function () {
            expect(layer).to.be.painted();
            done();
        })
         .addTo(map);
    });

    it('add again', function (done) {
        var layer = new maptalks.GridLayer('g', {
            projection : true,
            center : map.getCenter(),
            width : 100,
            height : 100,
            cols : [-5, 5],
            rows : [-5, 5]
        }, {
            renderer : 'canvas'
        });
        layer.once('layerload', function () {
            expect(layer).to.be.painted();
            map.removeLayer(layer);
            layer.once('layerload', function () {
                expect(layer).to.be.painted();
                done();
            });
            map.addLayer(layer);
        });
        map.addLayer(layer);
    });

    it('with a symbol', function (done) {
        var symbol = {
            'lineColor' : '#000',
            'lineOpacity' : 1,
            'polygonFill' : 'rgb(0, 0, 0)',
            'polygonOpacity' : 0.4
        };
        var layer = new maptalks.GridLayer('g', {
            projection : true,
            center : map.getCenter(),
            width : 100,
            height : 100,
            cols : [-5, 5],
            rows : [-5, 5]
        }, {
            renderer : 'canvas',
            'symbol' : symbol
        });
        layer.on('layerload', function () {
            expect(layer).to.be.painted();
            done();
        })
        .addTo(map);
    });

    it('multiple grids', function (done) {
        var symbol = {
            'lineColor' : '#000',
            'lineOpacity' : 1,
            'polygonFill' : 'rgb(0, 0, 0)',
            'polygonOpacity' : 0.4
        };
        var layer = new maptalks.GridLayer('g', [
            {
                projection : true,
                center : map.getCenter(),
                width : 100,
                height : 100,
                cols : [-5, 5],
                rows : [-5, 5],
                data : [
                    [0, 0, { properties : 1 }]
                ]
            },
            {
                projection : true,
                center : map.getCenter(),
                width : 50,
                height : 50,
                cols : [-5, 5],
                rows : [-5, 5],
                data : [
                    [0, 0, { properties : 1 }]
                ]
            }
        ], {
            renderer : 'canvas',
            'symbol' : symbol
        });
        layer.on('layerload', function () {
            expect(layer).to.be.painted();
            done();
        })
        .addTo(map);
    });

    it('can identify', function (done) {
        var layer = new maptalks.GridLayer('g', {
            projection : true,
            center : map.getCenter(),
            width : 100,
            height : 100,
            cols : [-5, 5],
            rows : [-5, 5],
            data : [
                [0, 0, { properties : 1 }]
            ]
        }, {
            renderer : 'canvas'
        });
        layer.on('layerload', function () {
            var expected = maptalks.Geometry.fromJSON({ 'type':'Feature', 'geometry':{ 'type':'Polygon', 'coordinates':[[[0, 0], [0.0008983152841103206, 0], [0.0008983152842207313, -0.0008983152841103206], [0, -0.0008983152841103206], [0, 0]]] }, 'properties':null });
            var actual = layer.identify(map.getCenter()).geometry;
            expect(actual.getCenter()).to.be.closeTo(expected.getCenter());
            done();
        })
        .addTo(map);
    });

    describe('test layer with data', function () {
        function testLayerWithData(done, data) {
            var layer = new maptalks.GridLayer('g', {
                projection : true,
                center : map.getCenter(),
                width : 100,
                height : 100,
                cols : [-5, 5],
                rows : [-5, 5],
                data : data
            }, {
                renderer : 'canvas'
            });
            layer.on('layerload', function () {
                expect(layer).to.be.painted();
                done();
            })
            .addTo(map);
        }

        it('with data of text symbol', function (done) {
            testLayerWithData(done, [
                [
                    [1, 2], 4, { 'property' : { 'foo':1 }, 'symbol' : {
                        'textName' : 'text',
                        'textSize' : { type:'interval', stops: [[0, 0], [16, 5], [17, 10], [18, 20], [19, 40]] }
                    }},
                    [4, [2, 3], { 'symbol' : { 'textName' : 'text', 'textSize' : 14 }}]
                ]
            ]);
        });
    });
});
