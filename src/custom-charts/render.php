<?php
$raw_values = isset($attributes['values']) ? $attributes['values'] : '';
$bar_colors = isset($attributes['barColors']) && is_array($attributes['barColors']) ? $attributes['barColors'] : [];
$chart_type = isset($attributes['chartType']) ? $attributes['chartType'] : 'bar';

$values = array_map('floatval', array_filter(array_map('trim', explode(',', $raw_values))));
$labels = array_map(fn($i) => "Value " . ($i + 1), array_keys($values));
$colors = [];

for ($i = 0; $i < count($values); $i++) {
    $colors[] = $bar_colors[$i] ?? '#36A2EB';
}

$encoded_values = json_encode($values);
$encoded_colors = json_encode($colors);
$encoded_labels = json_encode($labels);
$encoded_type = json_encode($chart_type);

$scales = in_array($chart_type, ['bar', 'line'])
    ? '{ y: { beginAtZero: true } }'
    : 'undefined';
?>
<div style="height: 400px;">
  <canvas id="CustomChart" style="width: 100%; height: 100%;"></canvas>
</div>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
  const ctx = document.getElementById('CustomChart').getContext('2d');
  new Chart(ctx, {
    type: <?php echo $encoded_type; ?>,
    data: {
      labels: <?php echo $encoded_labels; ?>,
      datasets: [{
        label: 'Values',
        data: <?php echo $encoded_values; ?>,
        backgroundColor: <?php echo $encoded_colors; ?>,
        borderColor: <?php echo $encoded_colors; ?>,
        borderWidth: 1,
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: <?php echo $scales; ?>
    }
  });
</script>
