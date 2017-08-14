// tarantino swearing dataset:
// https://raw.githubusercontent.com/fivethirtyeight/data/master/tarantino/tarantino.csv

function makePieChart(container,data,radius,colGen){

  var pieDataGen = d3.pie()
          .sort(null)
          .value(function(d){ return d.amount });
  var pieData = pieDataGen(data);
  var arcGen = d3.arc()
          .outerRadius(radius)
          .innerRadius(radius/2);
          // .cornerRadius(2);
  var arcLabelGen = d3.arc()
          .outerRadius(radius)
          .innerRadius(radius/2);

  var pie = d3.select(container).append('g')
          .attr('transform',`translate(${radius},${radius})`);

  pie.selectAll('.arc')
    .data(pieData)
    .enter()
    .append('path')
    .attr('id',function(d,i){ return 'arc'+i})
    .attr('class','arc')
    .attr('d',arcGen)
    .attr('fill',function(d){ return colGen(d.type) })

  pie.selectAll('.size')
    .data(pieData)
    .enter()
    .append('text')
    .style('text-anchor','middle')
    .style('alignment-baseline','middle')
    .style('font-family','Verdana')
    .style('font-size','12')
    .attr('transform',function(d){ return 'translate('+arcLabelGen.centroid(d)+')'})
    .text(function(d){ return `${d.type}: ${d.amount}` });

}

function makeBarChart(container,data,height,colourGen) {
  var chart = d3.select(container)
                .append('g');

  var bars = chart.selectAll('rect').data(data);

  // data bars
  bars.enter()
      .append('rect')
        .attr('width', '50')
        .attr('height', function(d) { return d.amount * 4 })
        .attr('x', function(d,i) { return i * 80 })
        .attr('y', function(d) { return 400 - d.amount * 4 })
        .style('fill', function(d, i) { return colGen(1 - (d.amount / 100)) });

  // labels
  var labels = chart.select('#labelArea').selectAll('text').attr('class','barLabel').data(data);

  labels.enter()
        .append('text')
          .attr('class','barLabel')
          .attr('x', function(d,i) { return (i * 80) + 25 })
          .attr('y', 430)
          .text(function(d) { return d.type })
          .style('alignment-baseline', 'hanging')
          .style('text-anchor', 'middle')
          .style('font-family', 'Verdana')
          .style('font-size', '.8em');

  // values
  var values = chart.append('g').attr('class','values').selectAll('text').data(data);

  values.enter()
        .append('text')
          .attr('class','barValue')
          .attr('x', function(d,i) { return (i * 80) + 25 })
          .attr('y', function(d) { return 400 + 15 - d.amount * 4 })
          .text(function(d) { return d.amount })
          .style('fill','white')
          .style('alignment-baseline', 'hanging')
          .style('text-anchor', 'middle')
          .style('font-family', 'Verdana')
          .style('font-size', '1.3em');
};

var deaths = [
  {
    id: 'reservoirDogs',
    name: 'Reservoir Dogs',
    year: 1992,
    deaths: [
      {
        type: 'Shooting',
        amount: 11
      }
    ]
  },
  {
    id: 'pulpFiction',
    name: 'Pulp Fiction',
    year: 1994,
    deaths: [
      {
        type: 'Shooting',
        amount: 6
      },
      {
        type: 'Katana',
        amount: 1
      }
    ]
  },
  {
    id: 'jackieBrown',
    name: 'Jackie Brown',
    year: 1997,
    deaths: [
      {
        type: 'Shooting',
        amount: 4
      }
    ]
  },
  {
    id: 'killBillv1',
    name: 'Kill Bill: Vol. 1',
    year: 2003,
    deaths: [
      {
        type: 'Shooting',
        amount: 3
      },
      {
        type: 'Kitchen Knife',
        amount: 1
      },
      {
        type: 'Scalping',
        amount: 1
      },
      {
        type: 'Morning Star',
        amount: 1
      },
      {
        type: 'Door Slam',
        amount: 1
      },
      {
        type: 'Katana',
        amount: 55
      }
    ]
  },
  {
    id: 'killBillv2',
    name: 'Kill Bill: Vol. 2',
    year: 2004,
    deaths: [
      {
        type: 'Shooting',
        amount: 9
      },
      {
        type: 'Snake Bite',
        amount: 1
      },
      {
        type: 'Eye Gouge',
        amount: 1
      },
      {
        type: 'Five Point Exploding Heart Technique',
        amount: 1
      }
    ]
  },
  {
    id: 'deathProof',
    name: 'Death Proof',
    year: 2007,
    deaths: [
      {
        type: 'Door Slam',
        amount: 5
      },
      {
        type: 'Man Vs. Man',
        amount: 1
      }
    ]
  },
  {
    id: 'inglouriousBasterds',
    name: 'Inglourious Basterds',
    year: 2009,
    deaths: [
      {
        type: 'Shooting',
        amount: 47
      },
      {
        type: 'Scalping',
        amount: 3
      },
      {
        type: 'Strangulation',
        amount: 2
      },
      {
        type: 'Suffocation',
        amount: 2
      },
      {
        type: 'Kitchen Knife',
        amount: 2
      },
      {
        type: 'Baseball Bat',
        amount: 1
      },
      {
        type: 'Fire',
        amount: 340
      }
    ]
  },{
    id: 'djangoUnchained',
    name: 'Django Unchained',
    year: 2012,
    deaths: [
      {
        type: 'Shooting',
        amount: 42
      },
      {
        type: 'Man Vs. Man',
        amount: 1
      },
      {
        type: 'Dog Attack',
        amount: 1
      },
      {
        type: 'Dynamite',
        amount: 20
      }
    ]
  },
];

var colGen = d3.scaleOrdinal()
        .range(['#F2BE22','#735A10','#8C0303','#400101','#CCCCCC']);

var graph = d3.select('.deathCounts');

var containers = graph.selectAll('svg.chart')
                        .data(deaths)
                        .enter()
                        .append('div')
                          .style('margin-bottom', '2em')
                          .attr('class','col-xs-12')
                        .append('svg')
                          .style('margin', 'auto')
                          .attr('class','chart')
                          .attr('height', 200)
                          .attr('width', 200)
                          .attr('id',function(d, i) { return `chart${i}` });

containers.each(function(d) {

  var containerID = '#' + this.id;
  var deathData = d.deaths;

  makeBarChart(containerID, deathData, colGen);

  // append year
  containers.append('text')
              .style('fill', '#cccccc')
              .text(function(d) { return d.name })
              .attr("transform", 'translate(100,100)')
              .attr('text-anchor','middle')
              .attr('alignment-baseline','middle')
              .attr('font-size',30);

});
