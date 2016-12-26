$.getJSON('http://localhost:3000/each', function(data) {
  var Frame = G2.Frame;
  var frame = new Frame(data);
  frame = Frame.combinColumns(frame, [
    "ApkDownloadUrlIllegal",
    "DownLoadLocalCacheNum",
    "DownLoadVideoAddVideo",
    "EnterMoviePlayCompleteVC",
    "EnterMoviePlayerVC",
    "EnterMyLearnVC",
    "EnterSetCourseVC",
    "EnterSetGradeVC",
    "EnterTopicDetailVC",
    "EnterUserGuideVC",
    "HaltApp",
    "PayCancelWithErrorMessage"
  ], 'value', 'city', 'date');
  var chart = new G2.Chart({
    id: 'c2',
    width: 1000,
    height: 220,
    plotCfg: {
      margin: [20, 80, 30]
    }
  });
  chart.setMode('select'); // 开启框选模式
  chart.select('rangeX'); // 选择框选交互形式
  chart.source(frame, {
    date: {
      type: 'time'
    },
    value: {
      alias: 'Temperature, ºF'
    }
  });
  chart.legend({
    position: 'top'
  });
  chart.axis('date', {
    line: {
      stroke: '#000'
    },
    tickLine: {
      stroke: '#000',
      value: 6 // 刻度线长度
    },
    title: null,
    labels: {
      label: {
        textAlign: 'start'
      }
    }
  });
  chart.axis('value', {
    title: null,
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
  chart.line().position('date*value').color('city', ['#1f77b4', '#ff7f0e', '#2ca02c']).shape('spline').size(2);
  chart.render();
  // 监听双击事件，这里用于复原图表
  chart.on('plotdbclick', function(ev) {
    chart.set('filters', {});
    chart.repaint();
  });
});
