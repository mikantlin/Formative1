// jQuery stuff
$(function() {
  // Smooth Scrolling ----------------------------
  $('[data-scroll-to]').on('click', function(e){

    e.preventDefault();

    var $target = $(this).data('scrollTo'),
      $offsetTop = $($target).offset().top;

    $('body').animate({scrollTop:$offsetTop}, $(this).data('scrollSpeed'));
  });
});

// d3 stuff

// var deathsOld = [
//   {
//     id: 'reservoirDogs',
//     name: 'Reservoir Dogs',
//     year: 1992,
//     deaths: [
//       {
//         type: 'Shooting',
//         amount: 11
//       }
//     ]
//   },
//   {
//     id: 'pulpFiction',
//     name: 'Pulp Fiction',
//     year: 1994,
//     deaths: [
//       {
//         type: 'Shooting',
//         amount: 6
//       },  
//       {
//         type: 'Katana',
//         amount: 1
//       }
//     ]
//   },
//   {
//     id: 'jackieBrown',
//     name: 'Jackie Brown',
//     year: 1997,
//     deaths: [
//       {
//         type: 'Shooting',
//         amount: 4
//       }
//     ]
//   },
//   {
//     id: 'killBillv1',
//     name: 'Kill Bill: Vol. 1',
//     year: 2003,
//     deaths: [
//       {
//         type: 'Shooting',
//         amount: 3
//       },
//       {
//         type: 'Kitchen Knife',
//         amount: 1
//       },
//       {
//         type: 'Scalping',
//         amount: 1
//       },
//       {
//         type: 'Morning Star',
//         amount: 1
//       },
//       {
//         type: 'Door Slam',
//         amount: 1
//       },
//       {
//         type: 'Katana',
//         amount: 55
//       }
//     ]
//   },
//   {
//     id: 'killBillv2',
//     name: 'Kill Bill: Vol. 2',
//     year: 2004,
//     deaths: [
//       {
//         type: 'Shooting',
//         amount: 9
//       },
//       {
//         type: 'Snake Bite',
//         amount: 1
//       },
//       {
//         type: 'Eye Gouge',
//         amount: 1
//       },
//       {
//         type: 'Five Point Exploding Heart Technique',
//         amount: 1
//       }
//     ]
//   },
//   {
//     id: 'deathProof',
//     name: 'Death Proof',
//     year: 2007,
//     deaths: [
//       {
//         type: 'Door Slam',
//         amount: 5
//       },
//       {
//         type: 'Man Vs. Man',
//         amount: 1
//       }
//     ]
//   },
//   {
//     id: 'inglouriousBasterds',
//     name: 'Inglourious Basterds',
//     year: 2009,
//     deaths: [
//       {
//         type: 'Shooting',
//         amount: 47
//       },
//       {
//         type: 'Scalping',
//         amount: 3
//       },
//       {
//         type: 'Strangulation',
//         amount: 2
//       },
//       {
//         type: 'Suffocation',
//         amount: 2
//       },
//       {
//         type: 'Kitchen Knife',
//         amount: 2
//       },
//       {
//         type: 'Baseball Bat',
//         amount: 1
//       },
//       {
//         type: 'Fire',
//         amount: 340
//       }
//     ]
//   },{
//     id: 'djangoUnchained',
//     name: 'Django Unchained',
//     year: 2012,
//     deaths: [
//       {
//         type: 'Shooting',
//         amount: 42
//       },
//       {
//         type: 'Man Vs. Man',
//         amount: 1
//       },
//       {
//         type: 'Dog Attack',
//         amount: 1
//       },
//       {
//         type: 'Dynamite',
//         amount: 20
//       }
//     ]
//   },
// ];

var movies = [
  {
    id: 'killBillV1',
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
    id: 'killBillV2',
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
  }
]

var width = 520;
var height = 400;
var marginLeft = 25;
var marginTop = 100;

// colour setup
var colourGen = d3.scaleOrdinal()
        .range(['#F2BE22','#FFF8A6','#8C0303','#400101','#CCCCCC','#735A10','#223333','#091412','#B25148','#9C1921']);

var makeBarChart = function(movie,containerID){
  //data scaling
  var xScale = d3.scaleLinear()
          .domain([0,6])
          .range([0,width]);

  var minMaxAmounts = d3.extent(movie.deaths,function(d){ return d.amount});

  var yScale = d3.scaleLinear()
          .domain([0,minMaxAmounts[1]])
          .range([height,0]);

  // select a chart
  var chart = d3.select(containerID)
                .append('g')
                  .attr('transform',`translate(${marginLeft},${marginTop})`);

  var bars = chart.selectAll('rect').data(movie.deaths);


      // on click, add the bars and transition them
      bars.enter()
          .append('rect')
            .attr('width', '50')
            .attr('height', 0)
            .attr('x', function(d,i) { return xScale(i) })
            .attr('y', height)
            .style('fill', '#8C0303')
            
            .transition()
            .delay(1000)
            .duration(1500)
            .attr('y', function(d) { return yScale(d.amount) })
            .attr('height', function(d) { return height - yScale(d.amount) });

      chart.append('g')
              .attr('id','labelArea');

      // labels
      var labels = chart.select('#labelArea').selectAll('text').attr('class','barLabel').data(movie.deaths);

      labels.enter()
            .append('text')
              .attr('class','barLabel')
              .attr('transform',function(d,i) { return `translate(${xScale(i) + 55},${height}) rotate(-90)` })
              .text(function(d) { return d.type })
              .style('fill','white')
              .style('alignment-baseline', 'hanging')
              .style('text-anchor', 'left')
              .style('font-family', 'Verdana')
              .style('font-size', '.8em')
              .style('opacity',0)
              .transition()
              .delay(1000)
              .duration(1000)
              .style('opacity',1);

      // values
      var values = chart.append('g').attr('class','values').selectAll('text').data(movie.deaths);

      values.enter()
            .append('text')
              .attr('class','barValue')
              .attr('x', function(d,i) { return xScale(i) + 25 })
              .attr('y', function(d) { return yScale(d.amount) - 20 })
              .text(function(d) { return d.amount })
              .style('fill','white')
              .style('font-weight','bold')
              .style('alignment-baseline', 'hanging')
              .style('text-anchor', 'middle')
              .style('font-family', 'Verdana')
              .style('font-size', '1.3em')
              .style('opacity',0)
              .transition()
              .delay(2500)
              .duration(1000)
              .style('opacity',1);
}

var chartsLoaded = false;

var deathClick = d3.select('[data-scroll-to="#deaths"]').on('click', function(e) {

  if (!chartsLoaded) {
    for (var i = 0; i < movies.length; i++) {
      makeBarChart(movies[i],`#${movies[i].id}deaths`);      
    }
  }

  chartsLoaded = true;
});