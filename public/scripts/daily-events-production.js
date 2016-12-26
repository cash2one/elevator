$.getJSON('http://localhost:3000/daily',function(data){
  var dataLength = data.length;
  var Frame = G2.Frame;
  var frame = new Frame(data);
  frame = Frame.combinColumns(frame, ['app', 'backend','total'], 'value', 'event type', 'date');
  var chart = new G2.Chart({
    id: 'c0',
    width : 1000,
    height : 500,
    plotCfg: {
      margin: [20, 120, 80, 80]
    }
  });
  chart.setMode('select'); // 开启框选模式
  chart.select('rangeX'); // 选择框选交互形式
  chart.source(frame, {
    date: {
      type: 'time',
      mask: 'yyyy.mm.dd',
      tickCount: dataLength
    },
    value: {
      alias: '日生产埋点量级监控'
    }
  });
  chart.axis('date', {
    line: null,
    tickLine: {
      stroke: '#000',
      value: 6 // 刻度线长度
    },
    title: null
  });
  chart.axis('value', {
    tickLine: {
      stroke: '#000',
      value: 6 // 刻度线长度
    },
    labels: {
      label: {
        fill: '#000'
      }
    },
    line: {
      stroke: '#000'
    },
    grid: null
  });
  chart.line().position('date*value').color('event type', ['#1f77b4', '#ff7f0e', '#2ca02c']).shape('spline').size(2);
  chart.render();

  chart.on('plotdbclick', function(ev) {
    chart.set('filters', {});
    chart.repaint();
  });
});
