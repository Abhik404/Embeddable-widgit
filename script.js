var urlInput = document.getElementById("urlInput");
var submitButton = document.getElementById("submitButton");
var loadingDiv = document.getElementById("loading");
var center_contaierDiv = document.getElementById('center_container');

submitButton.addEventListener("click", function() {
    var userLink = urlInput.value.trim();

    if (userLink !== null) {
        console.log("User entered the URL: " + userLink);
        loadingDiv.style.display = "flex";

        // Create an object with the userLink and other fields
        var requestData = [
            {
                "url": userLink,
                "enable_javascript": true,
                "check_spell": false
            }
        ];

        // Convert the object to JSON
        var data = JSON.stringify(requestData);

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                loadingDiv.style.display = "none";
				center_contaierDiv.style.display = "none";
                // Extract information from the JSON response
                var jsonResponse = JSON.parse(this.responseText);

                // Display version information
                document.getElementById("version").textContent = "Version: " + jsonResponse.version;

                // Display status information
                document.getElementById("status").textContent = "Status Code: " + jsonResponse.status_code + ", Status Message: " + jsonResponse.status_message;

                // Display tasks information
                var tasksDiv = document.getElementById("tasks");
                var tasksHTML = "<h2>Tasks</h2>";
                for (var i = 0; i < jsonResponse.tasks.length; i++) {
                    var task = jsonResponse.tasks[i];
                    tasksHTML += "<div>";
                    tasksHTML += "Task ID: " + task.id + "<br>";
                    tasksHTML += "Time: " + task.time + "<br>";
                    tasksHTML += "Result count: " + task.result_count + "<br>";
                    tasksHTML += "Path: " + task.path + "<br>";
                    // Add more task-specific information as needed
                    tasksHTML += "</div>";
                }
                tasksDiv.innerHTML = tasksHTML;

                // Display data section
                var dataDiv = document.getElementById("data");
                var dataHTML = "<h2>Data</h2>";

                for (var i = 0; i < jsonResponse.tasks.length; i++) {
                    var task = jsonResponse.tasks[i];
                    dataHTML += "<div>";
                    dataHTML += "Api: " + task.data.api + "<br>";
                    dataHTML += "URL: " + task.data.url + "<br>";
                    dataHTML += "Enable JavaScript: " + task.data.enable_javascript + "<br>";
                    dataHTML += "Check Spell: " + task.data.check_spell + "<br>";
                    // Add more task-specific information as needed
                    dataHTML += "</div>";
                }
                dataDiv.innerHTML = dataHTML;

                // Display item section
                var itemsDiv = document.getElementById("items");

                if (itemsDiv) {
                    var itemsHTML = "<h2>Items</h2>";

                    // Loop through the items array
                    for (var i = 0; i < jsonResponse.tasks[0].result[0].items.length; i++) {
                        var item = jsonResponse.tasks[0].result[0].items[i];

                        itemsHTML += "<div>";
                        itemsHTML += "Resource Type: " + item.resource_type + "<br>";
                        itemsHTML += "Status Code: " + item.status_code + "<br>";
                        itemsHTML += "Location: " + item.location + "<br>";
                        itemsHTML += "Title: " + item.meta.title + "<br>";
                        itemsHTML += "Charset: " + item.meta.charset + "<br>";
                        itemsHTML += "Description: " + item.meta.description + "<br>";
                        itemsHTML += "Keywords: " + item.meta.meta_keywords + "<br>";
                        itemsHTML += "Internal links Count: " + item.meta.internal_links_count + "<br>";
                        itemsHTML += "External links Count: " + item.meta.external_links_count + "<br>";

                        if (item.meta.htags.h1) {
                            itemsHTML += "<h3>H1 Tags:</h3><ul>";
                            // Loop through the "h1" elements and add them to the list
                            for (var j = 0; j < item.meta.htags.h1.length; j++) {
                                itemsHTML += "<li>" + item.meta.htags.h1[j] + "</li>";
                            }
                            itemsHTML += "</ul>";
                        } else {
                            itemsHTML += "H1: " + item.meta.htags.h1 + "<br>";
                        }

                        if (item.meta.htags.h2) {
                            itemsHTML += "<h3>H2 Tags:</h3><ul>";
                            // Loop through the "h3" elements and add them to the list
                            for (var j = 0; j < item.meta.htags.h2.length; j++) {
                                itemsHTML += "<li>" + item.meta.htags.h2[j] + "</li>";
                            }
                            itemsHTML += "</ul>";
                        } else {
                            itemsHTML += "H2: " + item.meta.htags.h2 + "<br>";
                        }

                        if (item.meta.htags.h3) {
                            itemsHTML += "<h3>H3 Tags:</h3><ul>";
                            // Loop through the "h3" elements and add them to the list
                            for (var j = 0; j < item.meta.htags.h3.length; j++) {
                                itemsHTML += "<li>" + item.meta.htags.h3[j] + "</li>";
                            }
                            itemsHTML += "</ul>";
                        } else {
                            itemsHTML += "H3: " + item.meta.htags.h3 + "<br>";
                        }

                        // Add more item-specific information as needed
                        itemsHTML += "</div>";
                    }

                    itemsDiv.innerHTML = itemsHTML;
                } else {
                    console.log("Element with id 'items' not found in the HTML.");
                }
            }
        });

        xhr.open("POST", "https://api.dataforseo.com/v3/on_page/instant_pages");
        xhr.setRequestHeader(
            "Authorization",
            "Basic YWJoaWNvb2wuMjMxMEBnbWFpbC5jb206NTM2ZGJjYzhmYTIyYjBlNQ=="
        );
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    } else {
        console.log("User cancelled the URL");
    }
});
