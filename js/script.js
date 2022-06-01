let getBasePATH = (select, limit = "") =>
	`https://chilealerta.com/api/query/?user=andr3iss&select=${select}${
		limit ? `&limit=${limit}` : ""
	}`;
$.ready(() => {
	$("#table").hide();
});

$(document).ready(() => {
	$("#table").hide();
});

let onChange = (e) => {
	$("#table").show();
	let value = e.value;
	[value, limit] = value.includes(";") ? value.split(";") : [value, ""];
	let url = getBasePATH(value, limit);

	value == "0"
		? $("#tbody").empty()
		: value == "onemi"
		? $.get(url, (data) => {
				$("#tbody").empty();
				$("#thead")
					.empty()
					.append(
						'<tr><th scope="col">Titulo</th><th scope="col">Region</th><th scope="col">Fecha</th><th scope="col">Url</th></tr>'
					);
				data = data[value];
				data.forEach(({ post_title, alert_region, alert_date, url }) =>
					$("#tbody").append(
						`<tr><th scope="row">${post_title}</th><td>${alert_region}</td><td>${alert_date}</td><td>${url}</td></tr>`
					)
				);
		  })
		: $.get(url, (data) => {
				$("#tbody").empty();
				$("#thead")
					.empty()
					.append(
						'<tr><th scope="col">Fuente</th><th scope="col">Magnitud</th><th scope="col">Referencia</th><th scope="col">Hora local</th></tr>'
					);
				data = data[value];

				data.forEach(({ source, magnitude, utc_time, reference }) =>
					$("#tbody").append(
						`<tr><th scope="row">${source}</th><td>${magnitude}</td><td>${reference}</td><td>${utc_time}</td></tr>`
					)
				);
		  });
};
